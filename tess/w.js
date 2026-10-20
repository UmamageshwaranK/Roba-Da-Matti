(function(){
  var f=self.fetch.bind(self);
  self.fetch=function(u,o){
    var s=String(u),m=s.match(/([a-z_]+)\.traineddata\.gz$/);
    if(!m)return f(u,o);
    var base=s.slice(0,s.lastIndexOf('/')+1);
    return f(base+m[1]+'.b64.txt').then(function(r){return r.ok?r.text():r}).then(function(t){
      if(typeof t!=='string')return t;
      var b=atob(t.trim()),a=new Uint8Array(b.length);
      for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);
      return new Response(a,{status:200});
    });
  };
})();
importScripts('worker.min.js');
