
## class {counter}
#### property
* _obj_.times
(_array_)   
    紀錄各個計時器的當前時間，陣列長度由.init()決定

* .times_last 
(_array_)   
    紀錄各個計時器駔後一次被設定的時間，reset時用

* .mode
(_array_)
記錄各計時器目前的動作
    * .mode[i]=0:**未計時**     
    * .mode[i]=1:**計時中**     

#### 狀態

 ` `| .mode[]=0 | .mode[]=1
---------|----------|---------
 .times[]=0 | 停止 | 發警告
 .times[]=!0 | 暫停 | 倒數中


#### Method
* .init(count (_number_) )      
    計時器初始化   

* .active(id(_number_))      
    設定計時器#id狀態為啟動       
    * .mode[id]=1;

* .stop(id(_number_))     
    設定計時器#id狀態為停止       
    * .times[id]=0 , .mode[id]=0;

* .pause(id(_number_))        
    設定計時器#id為暫停     
    * .mode[id]=0;

* .reset(id(_number_))        
    重設計時器#id的時間     
    * .timer[id]=.timer_last[id]


## UI
#### 按鈕動作
1. btn_set   
    * 設定倒數時間
1. btn_start
    * 啟動倒數   
1. btn_pause
    * 暫停計時
1. btn_stop
    * 停止計時
1. btn_reset
    * 重設為之前設定的時間

#### 按鈕狀態
(**F** alse , **T** rue)

動作/按鈕 | set | start | pause | stop | reset  
-| -| -| -| -| -|
 停止中 | **T** | **T** | F | F | **T**
 啟動中 | F | F | **T** | **T** | F
 暫停 | F | **T** | **T** | **T** | T