import * as fs from "fs";
import { join } from "path";

class FileSystemDAO {
  constructor(fileName) {
    this.FILE_PATH = join(process.cwd(), "data/");
    this.FILE = this.FILE_PATH.concat(fileName);
  }

  async persist(array = []) {
    const fileContent = JSON.stringify(array, null, 2);

    if (!fs.existsSync(this.FILE_PATH)) fs.promises.mkdir(this.FILE_PATH);
    return fs.promises.writeFile(this.FILE, fileContent);
  }

  async checkExistence() {
    const exist = fs.existsSync(this.FILE);
    if (!exist) await this.persist();
  }

  async readFile() {
    return fs.promises.readFile(this.FILE);
  }
}

export default FileSystemDAO;