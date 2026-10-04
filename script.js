const data={
'real-estate':{
 title:'Real Estate',
 desc:'Cinematic property tours, listing reels and lifestyle-led edits.',
 items:[
  {title:'Real Estate Video 1',url:'https://drive.google.com/file/d/18zSk8djPfn2wvgqe4aDTRa0Nicw9VyAa/view?usp=sharing',type:'drive'},
  {title:'Real Estate Video 2',url:'https://drive.google.com/file/d/1178PhYkX4XXJZSrKRaCS2lmVotF64deZ/view?usp=drive_link',type:'drive'},
  {title:'Real Estate Video 3',url:'https://drive.google.com/file/d/19DtdQLy_zr1td-VAx7wmoYdfvM5lW6xF/view?usp=drive_link',type:'drive'},
  {title:'Real Estate Video 4',url:'https://drive.google.com/file/d/1JxPExoO8Ar9dpirCrNiuVxEjdUbeLi8o/view?usp=drive_link',type:'drive'}
 ]},
'salon':{
 title:'Salon & Beauty',
 desc:'Premium beauty and salon edits for social and brand content.',
 items:[
  {title:'Salon Reel 1',url:'https://drive.google.com/file/d/1RqDoM5ED6HtUUTGhQszBtHYr580HXc5N/view?usp=drive_link',type:'drive'},
  {title:'Salon Reel 2',url:'https://drive.google.com/file/d/1oRby6ZlISHZ5LGqsWNMvA8tDchqeEH6Z/view?usp=drive_link',type:'drive'},
  {title:'Salon Reel 3',url:'https://drive.google.com/file/d/1B_CuTs_sQ4HxFelJO52cMbCZw7sJAReO/view?usp=drive_link',type:'drive'},
  {title:'Salon Reel 4',url:'https://drive.google.com/file/d/1Qa62f3pn9YETD6qrQ75xuoTzN89D5D6X/view?usp=sharing',type:'drive'},
  {title:'Salon Reel 5',url:'https://drive.google.com/file/d/1iXZEfMLzF_FpHfXBCzBuGbU5GJTlxlLO/view?usp=drive_link',type:'drive'},
  {title:'Salon Reel 6',url:'https://drive.google.com/file/d/1wV2S5PIZ4jwago4X4FUjAXG1d4Wu9F45/view?usp=drive_link',type:'drive'}
 ]},
'ai-commercials':{
 title:'AI Product Commercials',
 desc:'AI-generated commercials crafted for product brands.',
 items:[
  {title:'Jewellery 1',url:'https://drive.google.com/file/d/1UeMp4RoRzgySxbQfniq860yYm-T1aCjX/view?usp=drive_link',type:'drive'},
  {title:'Jewellery 2',url:'https://drive.google.com/file/d/15bEfXLgeYAZY0-bD0o99-wU1zxYaQAZd/view?usp=sharing',type:'drive'},
  {title:'Food & Nutrition',url:'',type:''},
  {title:'Beauty & Fragrance',url:'',type:''}
 ]},
'events':{
 title:'Events & DJ',
 desc:'High-energy highlights, recaps and performance edits.',
 items:[
  {title:'DJ Performance — Music Video',url:'https://drive.google.com/file/d/1APKOl6ma41QKPntGxgqHFFvIVzKGKRD7/view?usp=sharing',type:'drive'},
  {title:'DJ Event Highlight',url:'https://drive.google.com/file/d/1_tOWsG3JnNC5valeOVC5N_myeiw-z-i3/view?usp=drive_link',type:'drive'},
  {title:'Aftermovie',url:'',type:''}
 ]}
};

function getYTId(url){
  const m=url.match(/shorts\/([a-zA-Z0-9_-]{11})/)||url.match(/v=([a-zA-Z0-9_-]{11})/)||url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  return m?m[1]:null;
}

function getDriveId(url){
  const m=url.match(/\/d\/([a-zA-Z0-9_-]+)/)||url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return m?m[1]:null;
}

function getEmbedUrl(url,type){
  if(type==='yt'){
    const id=getYTId(url);
    return id?`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`:null;
  }
  if(type==='drive'){
    const id=getDriveId(url);
    return id?`https://drive.google.com/file/d/${id}/preview`:null;
  }
  return url;
}

function getThumbnail(url,type){
  if(type==='yt'){
    const id=getYTId(url);
    return id?`https://img.youtube.com/vi/${id}/mqdefault.jpg`:'';
  }
  if(type==='drive'){
    const id=getDriveId(url);
    return id?`https://drive.google.com/thumbnail?id=${id}&sz=w500`:'';
  }
  return '';
}

const modal=document.getElementById('modal'),
mt=document.getElementById('mTitle'),
md=document.getElementById('mDesc'),
pr=document.getElementById('projects');

function openVideo(url,title,type){
  if(!url){
    alert('Video coming soon! Check back later.');
    return;
  }
  const vbox=document.getElementById('videoBox');
  document.getElementById('videoTitle').textContent=title;
  const embedUrl=getEmbedUrl(url,type);
  if(type==='yt'&&embedUrl){
    vbox.innerHTML=`<iframe src="${embedUrl}" frameborder="0" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen style="width:100%;aspect-ratio:9/16;max-height:72vh;border-radius:14px;background:#000;display:block;"></iframe>`;
  } else if(type==='drive'&&embedUrl){
    vbox.innerHTML=`<iframe class="iframe-wide" src="${embedUrl}" frameborder="0" allow="autoplay;fullscreen" allowfullscreen style="width:100%;aspect-ratio:16/9;max-height:72vh;border-radius:14px;background:#000;display:block;"></iframe>`;
  } else {
    vbox.innerHTML=`<video controls playsinline preload="metadata" style="width:100%;max-height:72vh;border-radius:14px;background:#000;display:block;" src="${url}" autoplay></video>`;
  }
  document.getElementById('videoModal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeVideo(){
  const vbox=document.getElementById('videoBox');
  vbox.innerHTML='';
  document.getElementById('videoModal').classList.remove('open');
  document.body.style.overflow='';
}

function openCat(key){
  const d=data[key];
  mt.textContent=d.title;
  md.textContent=d.desc;
  pr.innerHTML=d.items.map((x)=>{
    const thumb=x.url?getThumbnail(x.url,x.type):'';
    const hasVideo=!!x.url;
    return `<button class="project project-btn" data-url="${x.url}" data-title="${x.title}" data-type="${x.type||''}">
      <div class="project-media" ${thumb?`style="background-image:url('${thumb}');background-size:cover;background-position:center;"`:''}>
        ${!thumb?'':''}
        <span>${hasVideo?'▶ PLAY VIDEO':'COMING SOON'}</span>
      </div>
      <p>${x.title}</p>
    </button>`;
  }).join('');
  pr.querySelectorAll('.project-btn').forEach(b=>{
    b.addEventListener('click',()=>openVideo(b.dataset.url,b.dataset.title,b.dataset.type));
  });
  modal.classList.add('open');
  document.body.style.overflow='hidden';
}

document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>openCat(b.dataset.cat)));
document.querySelector('.close').addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow=''});
document.querySelector('.backdrop').addEventListener('click',()=>{modal.classList.remove('open');document.body.style.overflow=''});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){
   if(document.getElementById('videoModal').classList.contains('open')) closeVideo();
   else {modal.classList.remove('open');document.body.style.overflow=''}
 }
});
document.querySelector('.video-close').addEventListener('click',closeVideo);
document.querySelector('.video-backdrop').addEventListener('click',closeVideo);

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
