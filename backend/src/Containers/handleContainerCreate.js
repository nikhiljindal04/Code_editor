import Docker from 'dockerode';
const docker = new Docker();

//get container port function
export const getContainerPort = async(projectId)=>{
    try {
        const container = await docker.listContainers({
            filters: {
                name: [projectId]
            }
        });
    if(container.length > 0){
        const containerInfo = await docker.getContainer(container[0].Id);
        const data = await containerInfo.inspect();
        // Safely access the port mapping
        const portBindings = data.NetworkSettings.Ports['5173/tcp'];
        return portBindings && portBindings.length > 0 ? portBindings[0].HostPort : null;
    }
    return null;
    } catch (error) {
        console.warn(`Error while getting container port for ${projectId}:`, error);
        return null;
    }
      
}

export const handleContainerCreate = async (projectId, terminalSocket, req, tcpSocket, head) => {
    try {
        //delete if any existing container with the same name
        console.log("projectId inside", projectId);
        const existingContainer = await docker.listContainers({
            filters: {
                name: [projectId]
            }
        });
        console.log("projectId inside handleContainerCreate 1", projectId);
        console.log("existing container", existingContainer);
        if(existingContainer.length > 0){
            console.log("container exist stopping and removing it");
            const container = docker.getContainer(existingContainer[0].Id);
            await container.remove({force: true});
            console.log("container removed 1");
        }      
        
        const container = await docker.createContainer({
        Image: 'sandbox',
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['/bin/bash'],
        name: projectId,
        Tty: true,
        // 1. Declare the anonymous volume at the root level of the config
        Volumes: {
            "/home/sandbox/app/node_modules": {} 
        },
        ExposedPorts: {
                "5173/tcp": {}
            },
        Env: [
                'CHOKIDAR_USEPOLLING=true', // Forces Vite to see file changes on Windows hosts
                'VITE_USER_NODE_ENV=development'
            ],
        HostConfig: {
            Binds: [`${process.cwd()}/projects/${projectId}:/home/sandbox/app`],
            PortBindings: {
                "5173/tcp": [
                    {
                        "HostPort": "0"
                    }
                ]
            },
            

        },
    });
    console.log("Container created", container.id);
    await container.start();
    console.log("container started");

    terminalSocket.handleUpgrade(req, tcpSocket, head, (establishedWSConnection) => {
        console.log("connection upgraded to web socket")
        terminalSocket.emit("connection", establishedWSConnection, req, container )
    });

    } catch (error) {
        console.log('Error creating container', error);
    }
    
  }


  