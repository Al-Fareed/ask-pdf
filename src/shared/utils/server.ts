import { Express} from "express";

export function start(app:Express,port: number) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
