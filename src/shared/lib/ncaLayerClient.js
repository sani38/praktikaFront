const NCALAYER_URL = "wss://127.0.0.1:13579/";

function connectNCALayer() {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(NCALAYER_URL);

        socket.onopen = () => resolve(socket);

        socket.onerror = () => {
            reject(
                new Error(
                    "NCALayer не запущен или соединение недоступно"
                )
            );
        };
    });
}

function sendNCALayerRequest(request) {
    return new Promise(async (resolve, reject) => {
        let socket;

        try {
            socket = await connectNCALayer();

            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);

                console.log("NCALayer response:", response);

                if (response.code === "200") {
                    socket.close();
                    resolve(response.responseObject ?? response.result ?? response);
                    return;
                }

                if (response.status === true) {
                    socket.close();
                    resolve(response.responseObject ?? response.result ?? response);
                    return;
                }

                if (response.responseObject) {
                    socket.close();
                    resolve(response.responseObject);
                    return;
                }

                if (response.result) {
                    socket.close();
                    resolve(response.result);
                    return;
                }

                if (response.code && response.code !== "200") {
                    socket.close();
                    reject(response);
                    return;
                }
            };

            socket.onerror = (error) => {
                reject(error);
            };

            socket.send(JSON.stringify(request));
        } catch (error) {
            reject(error);
        }
    });
}

export async function signTextWithNCALayer(text) {
    const request = {
        module: "kz.gov.pki.knca.basics",
        method: "sign",
        args: {
            format: "cms",
            data: btoa(unescape(encodeURIComponent(text))),
            signingParams: {
                decode: true,
                encapsulate: true,
                digested: false,
                tsaProfile: null,
            },
            signerParams: {
                extKeyUsageOids: [],
            },
            locale: "ru",
        },
    };

    return await sendNCALayerRequest(request);
}