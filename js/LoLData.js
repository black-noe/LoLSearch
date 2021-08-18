let audio_ = document.getElementsByTagName('audio');

const VueApp = {
  data(){
    return {
     data: "",
     dataSkin: "",
     data2: "",
     skinMenu: false,
     skin_list: [],
     search_name: "",
     flag: 1,
     page_num: 0,
     page: 0
    }
  },
  mounted(){
    this.getData()
    this.getSkin()
   
  },
  created(direction){
   
  },
  watch:{
    search_name: function(){
      this.search();
    }
  },
  computed: {
  
  },
  methods: {
    move(direction){
      let disp_width = Math.ceil(($(".skin_box").width()));
      let max_width = disp_width * this.skin_list.length-1;
      let mas_width = 0;
      let left_width = $('.skin_box ul').css('left');

      setTimeout(() => {
        if(this.flag){
          this.flag = 0;
       
          if(direction == "1"){
            if(this.page > 0){
              this.page--;
              $(".skin_box ul").animate({ left: "+="+disp_width+""}, 500);
            }

          }else{
            if(this.page < this.page_num-1){
              this.page++;
              $(".skin_box ul").animate({ left: "-="+disp_width+""}, 500);
            }
            
          }
        }
        this.flag = 1;
      }, 100);
    },
    search(){
      let search =  this.search_name;
      let that = this;

      if(search.length!=0){
        this.data.hero = [];
        for(let i in this.data2.hero){
          // for(let j in this.data2.hero[i].name){
          //   if(search.indexOf(this.data2.hero[i].name[j]) != -1 || search == this.data2.hero[i].title){
          //     that.data.hero.push(this.data2.hero[i])
          //   }
          // }
          if(this.data2.hero[i].name == search || this.data2.hero[i].title == search){
            that.data.hero.push(this.data2.hero[i]);
          }
        }
      }else{
        that.data.hero = that.data2.hero;
      }   
    },
    getData(){            //获取英雄APi
      let that = this;
      let url = '//game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js';
    
      $.get(url,function(data){
        that.data = JSON.parse(data);
        that.data2 = JSON.parse(data);
      })
    },
    getSkin(){            //获取皮肤APi
      let that = this;
      let url = "//game.gtimg.cn/images/lol/act/img/js/cuSkinList/cuskin_list.js";
    
      $.get(url,function(data){
        that.dataSkin = JSON.parse(data);
      })
    },
    off(){
      this.skinMenu = false;
      this.page = 0;
      this.page_num = 0;
    },
    skin_open(id){       //打开皮肤列表
      let that = this;
      let data = this.dataSkin;
      let num = id.length
      this.skin_list = [];
      
      
      for(let i in data.cuskin)   //匹配非炫彩皮肤
      {
        if(data.cuskin[i].isChromas == "false"){

          if(i.substr(0,num) == id && i.length == num+3){
            data.cuskin[i]["img"] = i;
            that.skin_list.push(data.cuskin[i]);
            this.skinMenu = true;
            this.page_num = this.skin_list.length;
          }
        }
      } 
    },
    audio_name(index){      //播放音频  
      audio_[index].play();//播放
      // audio_[index].pause();//暂停
    },
    playAll(){
      if (confirm("确定播放吗？")) {
        if (confirm("注意音量调小")) {
          for(let i in audio_){
            audio_[i].play();
          }
        }
      }
    },
    math_play(){
      let num = Math.round(Math.random()*10); 
      audio_[num].play();
    }
  },
}
Vue.createApp(VueApp).mount('#app')
