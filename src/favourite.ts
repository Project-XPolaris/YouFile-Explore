const FavouriteKey = 'favourite'
export interface FavouriteItem {
  apiUrl:string
  name:string
  type:string
  path:string
}
export class FavouriteManager {
  private static instance: FavouriteManager;
  items : FavouriteItem[] = []
  private constructor () {
    const raw = localStorage.getItem(FavouriteKey)
    if (raw) {
      this.items = JSON.parse(raw)
    }
  }

  public getItems () : FavouriteItem[] {
    return this.items.filter(it => it.apiUrl === localStorage.getItem('ServiceUrl'))
  }

  public static getInstance () : FavouriteManager {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  private saveData () {
    localStorage.setItem(FavouriteKey, JSON.stringify(this.items))
  }

  public addFavourite (item: { name:string, path:string, type:string }):void {
    if (this.items.find(it => it.path === item.path) !== undefined) {
      return
    }
    this.items.push({
      ...item,
      apiUrl: localStorage.getItem('ServiceUrl') ?? ''
    })
    this.saveData()
  }

  public removeFavourite (path : string):void {
    this.items = this.items.filter(it => it.path !== path)
    this.saveData()
  }
}
