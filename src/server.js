
const app = require("./index");

const Connectdb = require("./configs/db");

app.listen(4800, async() =>
{
    try
    {
        Connectdb();

        console.log("listening on port 4800");
    }
    catch(error)
    {
        console.log("error :", error);
    }
})