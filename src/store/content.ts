import { FileItem, readDir } from '../api/dir';
const CACHE_EXPIRE = 1000 * 60 * 20
const NO_NEED_CACHE_FETCH_TIME = 1000
class SaveItem {
  list: FileItem[] = [];
  targetPath: string = '';
  isDirty: boolean = false;
  lastUpdate: number = new Date().getTime()
  needCache:boolean = false
}

export class FileContentStorage {
  list: SaveItem[] = [];

  async readFileContent(targetPath: string, force: boolean):Promise<FileItem[]> {
    const saveCache = this.list.find(it => it.targetPath === targetPath);
    const startTime = new Date().getTime();
    if (
      // exist
      saveCache &&
      // not dirty
      !saveCache.isDirty &&
      // not force load
      !force &&
      // is need cache
      saveCache.needCache &&
      // is not expire
      startTime - saveCache.lastUpdate < CACHE_EXPIRE
    ) {
      return saveCache.list;
    }
    const response = await readDir(targetPath, '0');
    const endTime = new Date().getTime();
    const newCache = new SaveItem();
    newCache.isDirty = false;
    newCache.list = response;
    newCache.targetPath = targetPath;
    newCache.needCache = endTime - startTime > NO_NEED_CACHE_FETCH_TIME
    this.list = this.list.filter(it => it.targetPath !== targetPath);
    this.list.push(newCache);
    return response
  }
}

export const DefaultFileContentStorage = new FileContentStorage();
