//อ้างอิง Element index.html
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//กำหนดข้อมูลประวัติธุรกรรม
// const dataTransection=[
//     {id:1,text:"ค่าขนม",amount:-100},
//     {id:2,text:"ค่าห้อง",amount:-3000},
//     {id:3,text:"เงินเดือน",amount:+18000},
//     {id:4,text:"ค่าอาหาร",amount:-500},
//     {id:5,text:"ค่าหวย",amount:+20000},
// ]

//กำหนดข้อมูลประวัติธุรกรรม Array
let transection=[];

//กำหนดข้อมูลประวัติธุรกรรม
function init(){
    list.innerHTML = '';
    transection.forEach(addDataToList);
    calculateMoney();
}
function addDataToList(transection){
    const symbol = transection.amount < 0 ?'-':'+';
    const status = transection.amount < 0 ? 'minus':'plus';
    const item = document.createElement('li');
    result = formatNumber(Math.abs(transection.amount)); // ,
    item.classList.add(status);
    // item.innerHTML='ค่าซ่อมรถ <span>- ฿400</span><button class="delete-btn">x</button>';
    item.innerHTML=`${transection.text}<span>${symbol}${result}</span><button class="delete-btn" onclick="removeData(${transection.id})">x</button>`;
    console.log(item);
    list.appendChild(item)
}
// ,
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
function autoID(){
    return Math.floor(Math.random()*1000000)
}

function calculateMoney(){
    const amounts=transection.map(transection=>transection.amount);
    //คำนวณยอดคงเหลือ
    const total=amounts.reduce((result,item)=>(result+=item),0).toFixed(2);
    //คำนวณรายรับ
    const income=amounts.filter(item=>item>0).reduce((result,item)=>(result+=item),0).toFixed(2);
    console.log(income);
    //คำนวณรายจ่าย
    const expense=(amounts.filter(item=>item<0).reduce((result,item)=>(result+=item),0)*-1).toFixed(2);

   
    //แสดงผลทางจอภาพ html
    balance.innerText=`฿`+formatNumber(total);
    money_plus.innerText=`฿`+formatNumber(income);
    money_minus.innerText=`฿`+formatNumber(expense);
}
//Removedata
function removeData(id){
    transection=transection.filter(transection=>transection.id !==id)
    init(); //กรองข้อมูลล่าสุด
}

// Click เพิ่มธุรกรรม
function addTransection(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert("กรุณาป้อนข้อมูลให้ครบ");
    }else{
        const data={
            id:autoID(),
            text:text.value,
            amount:+amount.value
        }
        transection.push(data);
        addDataToList(data);
        calculateMoney();
        text.value='';
        amount.value='';
    }
}
form.addEventListener('submit',addTransection);
init();