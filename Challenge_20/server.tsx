import { React, ReactDOMServer } from "./deps.ts";
import { Application, Router, Context } from "./deps.ts";

const router = new Router();

const app = new Application();
router.get("/", (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.body = body();
});

router.post("/", async (ctx: Context) => {
    const cuerpo = ctx.request.body({ type: "form" });
    const value = await cuerpo.value;
    const color = value.get("color");

    if (color) {
        colors.push(color);
    }
    ctx.response.status = 200;
    ctx.response.body = body();
});

const colors: string[] = [];

const body = () => `<!DOCTYPE html>
    ${ReactDOMServer.renderToString(
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>Colores</title>
            </head>
            <body
                style={{
                    background: "#000000",
                    color: "#FFF",
                    display: "flex",
                    flexFlow: "column no-wrap",
                    justifyContent: "center",
                    minHeight: "90vh"
                }}>
                <form method="POST">
                    <label htmlFor="color">
                        Escribí el nombre de un color ( en inglés ) - Por
                        defecto será blanco
                    </label>
                    <br />
                    <input type="text" id="color" name="color" />
                    <br />
                    <input type="submit" value="Send" />
                
                <div>
                    {!!colors.length && (
                        <ul>
                            {colors.map((color, i) => (
                                <li
                                    key={i}
                                    style={{ color, paddingTop: "1em" }}>
                                    {color}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                </form>
            </body>
        </html>
    )}
`;

app.use(router.routes())
    .use(router.allowedMethods())
    .use((ctx) => {
        ctx.response.status = 404;
        ctx.response.body = "Not Found";
    });

console.log("Server runnig in http://localhost:8080");

await app.listen({ port: 8080 });
