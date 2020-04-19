var W,H;
var rearr=true;
//O'zgaruvchilar
const num_bubbles=10;//ekranda mavjud sharchalar soni
const br=5;//ekrandagi sharchalarning radiusi, agar 0 qilinsa sharlar ko'rinmay qoladi
const max_dist=150;//ikki sharcha orasida tok hosil qilish uchun maksimal masofa, oradagi masofa ortib ketsa tok hosil bo'lmaydi

//This variables are for controlling lighting bolt effect
const lW=5; //Tokni hosil qiluvchi chizilarning qalinligi 5 degani bu lineWidth=[0..5]
const num_of_lines=5;//Tok elementini hosil qilishda ishtirok etadigan chiziqlar miqdori, tok kuchliroqdek bo'lishini ta'minlaydi

//Ikki sharcha o'rtasida tok hosil bo'lganda, ularning orasida hosil bo'ladigan siniq chiziqdagi kesmalar soni
//Agar kesmalar soni qancha ko'p bo'lsa shunchalik tokning siniqlik darajasi ortib ketadi
const min_points=3;// minimal kesmalar soni
const max_points=10;// maksimal kesmalar soni
//Tokni hosil qilishda foydalaniladigan tok chizig'ining parametlari
const min_alfa=0;//chiziqning minimal alfa darajasi (prozrachnost)
const max_alfa=0.9;//chiziqning maksimal alfa darajasi (prozrachnost)
//Tokning asosiy rangi
const r=162; //qizil kanal
const g=253; //yashil kanal
const b=253;//ko'k kanal
//Siniq chiziq nuqtalarining kesmadan uzoqlasha olish masofalari (tok eni, yoki qalinligi deb aytsa ham bo'ladi)
const h_w=0.1;//uzoqlasha olish darajasi nisbiy, uzoqlasha olish masofasining kesma uzunligiga nisbati
//Aynan nisbat olinishiga sabab bu yerda agar sharchalar orasidagi masofa 100px bo'lsa, u holda
// siniq chiziqdagi nuqtalarning ikki shar orasidagi kesmagacha bo'lgan masofasi 100px*0.1=10 px ni tashkil etadi.
//agar masofa kichrayib borsa, masalan 10px bo'lsa u holda tokning qalinligi 10px*0.1=1px bo'lib qoladi, bu degani u juda maydalashib ketadi
// bunda masofa ortishi bilan tok eni ham ortib yiriklashib ketishini kuzatish mumkin, yoki masofa yaqinlashishi bilan kichiklashib ketishini
//shu sababli unga quyidagi limit chegaralar qo'yilgan
const min_hw=8;//tokning minimal eni
const max_hw=12;//tokning maksimal eni

function resizeCanvas(){
  canvas.width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  W=canvas.width;
  H=canvas.height;
  rearr=true;
}
window.onload = function(){
  drawAll();
}

function drawAll(){
  var canvas=document.getElementById('canvas');
  var ctx = canvas.getContext("2d")
  canvas.width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  W=canvas.width, H=canvas.height;


  var bubbles=[]
  for(var i=0;i<num_bubbles;i++){
    bubbles.push(new bubble());
  }
  function rearrange(){
    bubbles=[]
    for(var i=0;i<num_bubbles;i++){
      bubbles.push(new bubble());
    }
  }

  function bubble(){
    this.r=br;
    this.x=br+Math.random()*(W-2*br);
    this.y=br+Math.random()*(H-2*br);
    this.angle=Math.random()*360;
    this.speed=3;
    this.sx=Math.cos(this.angle)*this.speed;
    this.sy=Math.sin(this.angle)*this.speed;
  }

  function draw(){
    if(rearr){
      rearrange();
      rearr=false;
    }
    console.log(W+","+H);
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    draw_bolts();
    draw_bubbles();
    move_bubbles();

  }
  function draw_bubbles(){
    for(var i = 0; i < num_bubbles; i++){
      var b = bubbles[i];
      ctx.fillStyle="rgba("+255+","+255+","+255+","+1+")";
      ctx.beginPath();
      ctx.arc(b.x,b.y,b.r,0,2*Math.PI);
      ctx.fill();
    }
  }
  function move_bubbles(){
    for(var i=0;i<num_bubbles;i++){
      var b = bubbles[i];
      if(b.x<br) b.sx=Math.abs(b.sx);
      if(b.x>W-br) b.sx=-Math.abs(b.sx);
      if(b.y<br) b.sy=Math.abs(b.sy);
      if(b.y>H-br) b.sy=-Math.abs(b.sy);
      b.x+=b.sx;
      b.y+=b.sy;
    }
  }
  function draw_bolts(){
    for(var i=0;i<num_bubbles;i++){
      for(var j=0;j<num_bubbles;j++){
        if(i!=j){
          var dX=bubbles[i].x-bubbles[j].x;
          var dY=bubbles[i].y-bubbles[j].y;
          var dist=Math.sqrt(dX*dX+dY*dY)
          if(dist<max_dist){
            drawlinebetween(bubbles[i].x,bubbles[i].y,bubbles[j].x,bubbles[j].y);
          }
        }
      }
    }
  }


  function drawlinebetween(x1,y1,x2,y2){
    var l_l=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    var sin_l=(x2-x1)/l_l;
    var cos_l=(y2-y1)/l_l;
    // console.log(sin_l,cos_l);
    var g_ch=Math.min(Math.max(h_w/2*l_l,min_hw),max_hw);

    for(var i=0;i<num_of_lines;i++){
      var points=min_points+Math.round(Math.random()*(max_points-min_points));
      var diffX=(x2-x1)/(points+1);
      var diffY=(y2-y1)/(points+1);
      p_points=[];
      p_points.push({x:x1,y:y1});
      for(var j=0;j<points;j++){
        p_points.push({x:x1+(j+1)*diffX,y:y1+(j+1)*diffY});
      }
      p_points.push({x:x2,y:y2});
      for(var j=1;j<points+1;j++){
        var rand=Math.random();
        p_points[j].x+=(rand-0.5)/5*diffX;
        p_points[j].y+=(rand-0.5)/5*diffY;
        rand=Math.random()*2-1;
        p_points[j].ch=rand*g_ch;
        p_points[j].x+=p_points[j].ch*cos_l;
        p_points[j].y-=p_points[j].ch*sin_l;
      }
      ctx.beginPath();
      var rand_col=Math.random();
      var ra=r+rand_col*(255-r);
      var ga=g+rand_col*(255-g);
      var ba=b+rand_col*(255-b);
      var alfa=min_alfa+Math.random()*(max_alfa-min_alfa);
      var l_w=Math.round(Math.random()*lW);
      //drawing bolt shadow light
      for(var k=5;k>=1;k--){
        let alf=1/(k)/40;
        ctx.strokeStyle="rgba("+255+","+255+","+255+","+alf+")";
        ctx.lineWidth=l_w*(k*4);
        ctx.lineCap = "round";
        ctx.moveTo(p_points[0].x,p_points[0].y);
        for(j=1;j<points+2;j++){
          ctx.lineTo(p_points[j].x,p_points[j].y);
        }
        ctx.stroke();
      }

      //drawing bolt
      ctx.strokeStyle="rgba("+ra+","+ga+","+ba+","+alfa+")";
      ctx.lineWidth=l_w;
      ctx.lineCap = "butt";
      ctx.moveTo(p_points[0].x,p_points[0].y);
      for(j=1;j<points+2;j++){
        ctx.lineTo(p_points[j].x,p_points[j].y);
      }
      ctx.stroke();
    }

  }
  setInterval(draw,40);
}
