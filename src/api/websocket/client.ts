import URI from 'urijs'
export interface ApiSocketListener {
  onMessage(data:string):void
}
class ApiWebsocket {
  socket: WebSocket | null = null;
  listeners : {[key:string]:ApiSocketListener} = {}
  addListener (label:string, listener : ApiSocketListener) {
    this.listeners[label] = listener
  }

  notifyAll (data:string) {
    Object.getOwnPropertyNames(this.listeners).forEach(name => {
      this.listeners[name].onMessage(data)
    })
  }

  connect () {
    if (this.socket) {
      return
    }
    const apiUrl = localStorage.getItem('ServiceUrl')
    if (!apiUrl) {
      return
    }
    let connectUri : string = URI(apiUrl).pathname('/notification').toString()
    connectUri = connectUri.replace('http', 'ws')
    console.log(connectUri)
    this.socket = new WebSocket(connectUri)
    this.socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
    this.socket.onmessage = (ev) => {
      console.log(ev)
      this.notifyAll(ev.data)
    }
  }
}

export const DefaultApiWebsocket = new ApiWebsocket()
