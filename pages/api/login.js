import cookie from "cookie";
import dbConnect from "util/mongodb";

const adminApi = async (req, res) => {
  await dbConnect();

  if (req.method === "POST") {
    try {
      if (
        req.body.adminName === process.env.ADMIN_NAME &&
        req.body.adminPassword === process.env.ADMIN_PASSWORD
      ) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).send("successfull");
      } else {
        res.status(404).send("faild");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
export default adminApi;
