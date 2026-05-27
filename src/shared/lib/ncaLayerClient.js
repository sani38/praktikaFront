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
        let completed = false;

        try {
            socket = await connectNCALayer();

            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);

                console.log("NCALayer response:", response);

                if (response.code && response.code !== "200") {
                    completed = true;
                    socket.close();
                    reject(response);
                    return;
                }

                const possibleSignature =
                    typeof response.body?.result?.[0] === "string"
                        ? response.body.result[0]
                        : typeof response.responseObject === "string"
                            ? response.responseObject
                            : typeof response.result === "string"
                                ? response.result
                                : typeof response.responseObject?.cms === "string"
                                    ? response.responseObject.cms
                                    : null;

                if (!possibleSignature) {
                    return;
                }

                completed = true;
                socket.close();
                resolve(possibleSignature);
            };

            socket.onerror = (error) => {
                completed = true;
                reject(error);
            };

            socket.onclose = () => {
                if (!completed) {
                    reject(new Error("NCALayer соединение закрыто без подписи"));
                }
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
                encapsulate: false,
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