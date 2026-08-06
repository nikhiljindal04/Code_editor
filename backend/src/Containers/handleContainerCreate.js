import Docker from 'dockerode';
const docker = new Docker();

export const listContainers = async ()=>{
    const containers = await docker.listContainers();
    //print ports array for all containers
    for(const container of containers){
        console.log(container.Ports);
    }
}

export const handleContainerCreate = async (projectId, terminalSocket, req, tcpSocket, head) => {
    try {
        const container = await docker.createContainer({
        Image: 'sandbox',
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['/bin/bash'],
        Tty: true,
        ExposedPorts: {
                "5173/tcp": {}
            },
            Env: [
                'HOST=0.0.0.0'
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
        console.log("connection upgraded to web socker")
        terminalSocket.emit("connection", establishedWSConnection, req, container )
    });

    } catch (error) {
        console.log('Error creating container', error);
    }
    
  }


  