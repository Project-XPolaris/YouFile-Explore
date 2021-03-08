import { v4 as uuidv4 } from 'uuid'

export type ConnectionConfig = {
  id:string
  name:string
  apiUrl?: string
}
export class ConfigManager {
  public static StoreKey = 'Configs'
  public configs : ConnectionConfig[] = []
  loadData () : void{
    console.log('load config')
    const rawJson = localStorage.getItem(ConfigManager.StoreKey)
    if (rawJson) {
      console.log(JSON.parse(rawJson))
      this.configs = JSON.parse(rawJson)
    }
  }

  saveData () : void{
    const rawJson = JSON.stringify(this.configs)
    localStorage.setItem(ConfigManager.StoreKey, rawJson)
  }

  newConfig ():ConnectionConfig {
    const id = uuidv4()
    const config = {
      id,
      name: `config@${id.slice(id.length - 5, id.length)}`
    }
    this.configs.push(config)
    this.saveData()
    return config
  }

  updateConfig (config:ConnectionConfig):void{
    this.configs = this.configs.map(saveConfig => {
      if (saveConfig.id === config.id) {
        return {
          ...saveConfig,
          ...config
        }
      }
      return {
        ...saveConfig
      }
    })
    this.saveData()
  }

  getConfigWithId (id:string):ConnectionConfig | undefined {
    return this.configs.find(it => it.id === id)
  }

  applyConfig (id:string):void{
    const config = this.getConfigWithId(id)
    if (config) {
      localStorage.setItem('ServiceUrl', config.apiUrl ?? '')
    }
  }

  deleteConfig (id:string) : void {
    this.configs = this.configs.filter(it => it.id !== id)
    this.saveData()
  }
}
export const DefaultConfigManager = new ConfigManager()
