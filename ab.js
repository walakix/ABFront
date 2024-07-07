

var datas;

function loadPage() {
    let now = new Date(Date.now());
    let d;
    //d = now.getYear()+"-"+now.getMonth()+"-"+now.getDay()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
    d=now.toISOString().slice(0,19);
    console.log("Dátum: "+d); 
    //document.getElementById("datedata").value = d;
    deleteTable();
}

function deleteTable() {
    const tablediv = document.getElementById("tablediv");
        while (tablediv.firstChild) {
            tablediv.removeChild(tablediv.lastChild);
        }
        let s=getFirstTable() + getLastTable();
        tablediv.innerHTML = tablediv.innerHTML+s;
	
}


function getFirstTable() {
    let s=`
            <table>
                <tr class="tcimsor">
                    <th class="thid">id</th><th class="thintdata">intdata</th><th class="thfloatdata">floatdata</th><th class="thbooldata">booldata</th><th class="thdatedata">datedata</th><th class="thcomment">comment</th>
                </tr>
    
    `;
    return s;
}


function getLastTable() {
    let s=`
            </table>        
    `;
    return s;
}
function selectItem(index) {
    if (datas.length>index) {
        //alert(datas[index].comment);
        document.getElementById("id").value = datas[index].id;
        document.getElementById("intdata").value = datas[index].intdata;
        document.getElementById("floatdata").value = datas[index].floatdata;
        document.getElementById("booldata").value = datas[index].booldata;
        document.getElementById("datedata").value = datas[index].datedata;
        document.getElementById("comment").value = datas[index].comment;
    }

}

function changedLinks(str) {
    document.getElementById("link").value=str; 
    /*const datas = document.getElementById("datas");
    datas.innerHTML=datas.innerHTML + str;*/
}


function getRest(par) {
    deleteTable();
    const tablediv = document.getElementById("tablediv");

    cbLinks=document.getElementById("links");
    //let link=cbLinks.options[cbLinks.selectedIndex].text ;
    //let link=cbLinks.value;
    let link=document.getElementById("link").value;
    let chk =document.getElementById("withapikey").checked;
    let key="false";
    if (chk==true) {key="true";}
    let apikey=document.getElementById("lapikey").value;
    let id=document.getElementById("id").value;
    let s="";
    //s=s+  link +" / "+apikey+" / "+key+" / " + id+"<br>";
    //document.getElementById("getlink").innerHTML = link;

    document.getElementById("status").innerHTML = "";
    document.getElementById("statusText").innerHTML = "";
    document.getElementById("sendData").innerHTML = "";

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {

        try {
            datas=JSON.parse(this.responseText);
            //s=s + this.responseText+"<br>";
            s=s+getFirstTable()

            for(let i=0; i<datas.length; i++) {
                    s=s+ 
                    "<tr class=\"datas\" onclick='selectItem(" + i + ")'>\n"+
                    "<td>"+datas[i].id+"</td>" + "<td>"+datas[i].intdata+"</td>" + "<td>"+datas[i].floatdata+"</td>" + "<td>"+datas[i].booldata+"</td>" + 
                    "<td>"+datas[i].datedata+"</td>" + "<td>"+datas[i].comment+"</td>\n" + 
                    "</tr>\n";
                }
            s=s+getLastTable();
        while (tablediv.firstChild) {
            tablediv.removeChild(tablediv.lastChild);
        }
        tablediv.innerHTML = tablediv.innerHTML+s;
    
        }
        catch {
            s=s + this.responseText+"<br>";
        }

        //s=s + this.status + " " + this.statusText + "<br>";
        document.getElementById("status").innerHTML = this.status;
        document.getElementById("statusText").innerHTML = this.statusText;
        //s=s+this.getAllResponseHeaders() + "<br>";


    }
//    xhttp.open("GET", link+"getall", true);
    xhttp.open("GET", link + par);
    xhttp.setRequestHeader("Content-type", "application/json");
//    xhttp.setRequestHeader("Accept", "application/json");
//    xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
//    xhttp.setRequestHeader("Access-Control-Allow-Credentials","true");
//    xhttp.setRequestHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, OPTIONS");
//    xhttp.setRequestHeader("Access-Control-Allow-Headers","Origin, Content-Type, Accept");

    //xhttp.setRequestHeader("Host", "141.147.47.82");
    if (chk) {
        xhttp.setRequestHeader("Apikey", CryptoJS.MD5(apikey));
    }
    xhttp.send();
}

function getAll() {
    getRest("getall");
}

function getLast() {
    getRest("getlast");
}

function getOne() {
    getRest("getone/"+document.getElementById("id").value);
}


function deleteRest(par) {
    deleteTable();

    cbLinks=document.getElementById("links");
    //let link=cbLinks.options[cbLinks.selectedIndex].text ;
    //let link=cbLinks.value;
    let link=document.getElementById("link").value;
    let chk =document.getElementById("withapikey").checked;
    let key="false";
    if (chk==true) {key="true";}
    let apikey=document.getElementById("lapikey").value;
    let id=document.getElementById("id").value;
    //let s="";
    //s=s+  link +" / "+apikey+" / "+key+" / " + id+"<br>";
    //document.getElementById("getlink").innerHTML = link;

    document.getElementById("status").innerHTML = "";
    document.getElementById("statusText").innerHTML = "";
    document.getElementById("sendData").innerHTML = "";

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        //s=s + this.status + " " + this.statusText + "<br>";
        document.getElementById("status").innerHTML = this.status;
        document.getElementById("statusText").innerHTML = this.statusText;
        //s=s+this.getAllResponseHeaders() + "<br>";

    }
//    xhttp.open("GET", link+"getall", true);
    xhttp.open("DELETE", link + par);
    xhttp.setRequestHeader("Content-type", "application/json");
//    xhttp.setRequestHeader("Accept", "application/json");
//    xhttp.setRequestHeader("Access-Control-Allow-Origin"),"*";

    //xhttp.setRequestHeader("Host", "141.147.47.82");
    if (chk) {
        xhttp.setRequestHeader("Apikey", CryptoJS.MD5(apikey));
    }
    xhttp.send();
}

function deleteAll() {
    deleteRest("deleteall");
}

function deleteOne() {
    deleteRest("deleteone/"+document.getElementById("id").value);
}


function writeRest(par, mode) {
    deleteTable();

    cbLinks=document.getElementById("links");
    //let link=cbLinks.options[cbLinks.selectedIndex].text ;
    //let link=cbLinks.value;
    let link=document.getElementById("link").value;
    let chk =document.getElementById("withapikey").checked;
    let key="false";
    if (chk==true) {key="true";}
    let apikey=document.getElementById("lapikey").value;
    let id=document.getElementById("id").value;

    //s=s+  link +" / "+apikey+" / "+key+" / " + id+"<br>";
    //document.getElementById("getlink").innerHTML = link;

    document.getElementById("status").innerHTML = "";
    document.getElementById("statusText").innerHTML = "";
    document.getElementById("sendData").innerHTML = "";

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        //s=s + this.status + " " + this.statusText + "<br>";
        document.getElementById("status").innerHTML = this.status;
        document.getElementById("statusText").innerHTML = this.statusText;
        
        //s=s+this.getAllResponseHeaders() + "<br>";


    }
//    xhttp.open("GET", link+"getall", true);
    xhttp.open(mode, link + par);
    xhttp.setRequestHeader("Content-type", "application/json");
//    xhttp.setRequestHeader("Accept", "application/json");
//    xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
    //xhttp.setRequestHeader("Host", "141.147.47.82");
    if (chk) {
        xhttp.setRequestHeader("Apikey", CryptoJS.MD5(apikey));
    }
    //JSON tartalom
    let intdata=document.getElementById("intdata").value;
    let floatdata=document.getElementById("floatdata").value;
    let booldata=document.getElementById("booldata").value;
    let datedata=document.getElementById("datedata").value;
    let comment=document.getElementById("comment").value;
    let sendData;
    if (datedata!="") {
        sendData='{"intdata":'+intdata+', "floatdata":'+floatdata+', "booldata":'+booldata+', "datedata":"'+datedata+'", "comment":"'+comment+'" }';
    }else {
        sendData='{"intdata":'+intdata+', "floatdata":'+floatdata+', "booldata":'+booldata+', "comment":"'+comment+'" }';
    }
    //let sendData='{"intdata":'+intdata+', "floatdata":'+floatdata+', "booldata":'+booldata+', "comment":"'+comment+'" }';
    //s=s+ "<p>"+this.sendData+"</p>";
    //s=s+'{"adat1":1, "adat2":2}<br>\n';
    console.log(sendData);
    xhttp.send(sendData);
}

function writeOne() {
    writeRest("writeone", "POST");
}

function updateOne() {
    writeRest("updateone/"+document.getElementById("id").value, "PUT");
}

