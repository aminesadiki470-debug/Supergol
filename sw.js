const V='supergol-v1',CORE=['./','./index.html','./manifest.json','./supergol.png'];
const EXT=['cdnjs.cloudflare.com','cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){e.respondWith(fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));return}
 if(EXT.includes(u.hostname)){e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{if(y.ok||y.type==='opaque'){const z=y.clone();caches.open(V).then(c=>c.put(r,z))}return y})))}});
