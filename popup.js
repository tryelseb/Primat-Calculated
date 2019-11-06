document.getElementById('btn').addEventListener('click', Start, false);

const selectVar_1 = document.getElementById('start-value');
const selectVar_2 = document.getElementById('end-value');

let a = 0;
let result = [];
let element = 0;
let step = 0;
let arr = [];
let empty_row = '';

let block_width = 43;
let block_height = -49;
let top_block = 0;
let left_block = 0;

const arr_octal = {
    0: '000',
    1: '001',
    2: '010',
    3: '011',
    4: '100',
    5: '101',
    6: '110',
    7: '111'
}
const arr_six = {
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F'
}

let block_result = document.getElementById('block-result');

// Error 
let error = document.createElement('p');
error.classList.add('errors');
// 
// Main result //
let main_result = document.createElement('p');
//----//

function Start() {
    let r = document.getElementById('test').value;
    // update
    block_result.innerHTML = '';
    step = 0;
    //
    if (r.length === 0) {
        document.getElementsByClassName('wrapper')[0].appendChild(error);
        error.innerHTML = chrome.i18n.getMessage("Error_empty");
        throw 'Empty variables.';
    } else {
        error.remove();
    }
    if (selectVar_1.value == '10' && selectVar_2.value == '2') {
        TenToTwo();
    }
    if (selectVar_1.value == '2' && selectVar_2.value == '10') {
        let r = document.getElementById('test').value;
        let end = r;
        let reversed = r.split('').reverse();
        reversed.find(function (element) {
            if (element > '1') {
                document.getElementsByClassName('wrapper')[0].appendChild(error);
                error.innerHTML = chrome.i18n.getMessage("Error_binary");
                throw 'Not binary system.';
            } else {
                error.remove();
            }
        });
        backResult(reversed, end);
    }
    if (selectVar_1.value == '10' && selectVar_2.value == '8') {
        let r = document.getElementById('test').value;
        TenToEight(r);
    }
    if (selectVar_1.value == '8' && selectVar_2.value == '10') {
        let r = document.getElementById('test').value;
        let end = r;
        let reversed = r.split('').reverse();
        reversed.find(function (element) {
            if (element > '7') {
                document.getElementsByClassName('wrapper')[0].appendChild(error);
                error.innerHTML = chrome.i18n.getMessage("Error_octal");
                throw 'Not octal system.';
            } else {
                error.remove();
            }
        });
        backResult(reversed, end);
    }
    if (selectVar_1.value == '8' && selectVar_2.value == '2') {
        let r = document.getElementById('test').value;
        let end = r;
        let r_arr = r.split('');
        r_arr.find(function (element) {
            if (element > '7') {
                document.getElementsByClassName('wrapper')[0].appendChild(error);
                error.innerHTML = chrome.i18n.getMessage("Error_octal");
                throw 'Not octal system.';
            } else {
                error.remove();
            }
        });
        EightToTwo(r_arr, end);
    }
    if (selectVar_1.value == '2' && selectVar_2.value == '8') {
        let r = document.getElementById('test').value;
        let end = r;
        let reversed = r.split('');
        reversed.find(function (element) {
            if (element > '1') {
                document.getElementsByClassName('wrapper')[0].appendChild(error);
                error.innerHTML = chrome.i18n.getMessage("Error_binary");
                throw 'Not binary system.';
            } else {
                error.remove();
            }
        });
        TwoToEight(reversed, end);
    }
    if (selectVar_1.value == '10' && selectVar_2.value == '16') {
        console.log("step one");
        TenToSixteen();
    }
}
// 10 > 16
function TenToSixteen() {
    let r = document.getElementById('test').value;
    if (r !== '') {
        const end = r; 
        r = StrToNum(r);
        
        function Count(r) {
            while (r !== -1) {
                if (r < 16) {
                    element = r % 16;
                    result.push(element);
                    r = -1;
                    console.log(result);
                }
                else if (r % 16 == 0) {
                    element = 0;
                    result.push(element);
                    r = r / 16;
                } else if (r % 16 !== 0){
                    element = r % 16;
                    result.push(element);
                    r = Math.floor(r / 16);
                }
            }
            for (let i = 0; i < result.length; i++){
                for (let n in arr_six) {
                    if (StrToNum(result[i]) === StrToNum(n)) {
                        result[i] = arr_six[n];
                    }
                }
            }
            console.log('length ' + result.length);
            for (let i = (result.length -1); i >= 0; i--){
                empty_row += result[i];
            }
            console.log(empty_row);
        }
        Count(r);
    }
}
// 8 > 2
function EightToTwo(r_arr, end) {
    const descriptor = document.createElement('p');
    descriptor.style.cssText = "font-weight: 500; text-align: justify;"
    block_result.appendChild(descriptor);
    descriptor.innerHTML= chrome.i18n.getMessage("EightToTwo");
    CreateTable();
    for (let i = 0; i < r_arr.length; i++) {
        for (let t in arr_octal) {
            if (StrToNum(r_arr[i]) == StrToNum(t)) {
                step += 1;
                // Step //
                let title_step = document.createElement('p');
                title_step.classList.add('step');
                block_result.appendChild(title_step);
                title_step.innerHTML = chrome.i18n.getMessage("Step") + step;
                // ---- //
                let sub_result = document.createElement('div');
                let main_block = document.createElement('div');
                // main_block.classList.add('block');
                let p1 = document.createElement('p');
                p1.classList.add('l1');

                block_result.appendChild(sub_result);
                sub_result.appendChild(main_block);
                main_block.appendChild(p1);
                empty_row += arr_octal[t];
                p1.innerHTML = '<span>' + r_arr[i] + '</span>' + ' = ' + '<span>' + arr_octal[t] + '</span>';
                console.log('Result ' + empty_row);
            }
        }
    }
    block_result.appendChild(main_result);
    main_result.innerHTML = "<b>" + chrome.i18n.getMessage("Result") + "</b>" + end + "<sub>8</sub> " + "= " + empty_row + " " + "<sub>2</sub>";
    empty_row = '';
}
//

// 2 > 8
function TwoToEight(r_arr, end) {
    const descriptor = document.createElement('p');
    descriptor.style.cssText = "font-weight: 500; text-align: justify;"
    block_result.appendChild(descriptor);
    descriptor.innerHTML= chrome.i18n.getMessage("TwoToEight");
    while (r_arr.length % 3 != 0) {
        r_arr.unshift('0');
    }
    r_arr = r_arr.join('');
    for (let i = 0; i < r_arr.length; i += 3) {
        result.push(r_arr.slice(i, i + 3));
    }

    for (let i = 0; i < result.length; i++) {
        empty_row += result[i] + ' ';
    }
    
    const row_1 = document.createElement('p');
    block_result.appendChild(row_1);
    row_1.innerHTML= end + "<sub>2</sub>" + ' = ' + '<span style="border-bottom: 2px solid red; display: inline;">' + empty_row + '</span>' + "<sub>8</sub>";
    empty_row = ''; 

    const row_2 = document.createElement('p');
    block_result.appendChild(row_2);
    row_2.style.cssText = "font-weight: 500; text-align: justify;"
    row_2.innerHTML = chrome.i18n.getMessage("TwoToEight_2");

    CreateTable();

    for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
        for (let t in arr_octal) {
            if (StrToNum(result[i]) == StrToNum(arr_octal[t])) {
                step += 1;
                // Step //
                let title_step = document.createElement('p');
                title_step.classList.add('step');
                block_result.appendChild(title_step);
                title_step.innerHTML = chrome.i18n.getMessage("Step") + step;
                // ---- //
                let sub_result = document.createElement('div');
                let main_block = document.createElement('div');
                let p1 = document.createElement('p');
                p1.classList.add('l1');

                block_result.appendChild(sub_result);
                sub_result.appendChild(main_block);
                main_block.appendChild(p1);
                p1.innerHTML = '<span>' + result[i] + '</span>' + ' = ' + '<span>' + t + '</span>';
                empty_row += t;
            }
        }
    }
    block_result.appendChild(main_result);
    main_result.innerHTML = "<b>" + chrome.i18n.getMessage("Result") + "</b>" + end + "<sub>2</sub> " + "= " + empty_row + " " + "<sub>8</sub>";
    empty_row = '';
    result = [];
}
//
function CreateTable() {
    const table = document.createElement('table');
    table.style.cssText = 'width:250px; font-size: 17px; text-align: center;border-collapse:collapse; font-weight: 500;';
    block_result.appendChild(table);
    table.innerHTML = "<tbody><tr><td>000</td><td>0</td><tr><tr><td>001</td><td>1</td><tr><tr><td>010</td><td>2</td><tr><tr><td>011</td><td>3</td><tr><tr><td>100</td><td>4</td><tr><tr><td>101</td><td>5</td><tr><tr><td>110</td><td>6</td><tr><tr><td>111</td><td>7</td><tr></tbody>"
}
// 10 => 8; 
function TenToEight(r) {
    const description = document.createElement('p');
    description.style.cssText = "font-weight: 500; text-align: justify;"
    block_result.appendChild(description);
    description.innerHTML= chrome.i18n.getMessage("Description_octal");
    if (r !== '') {
        const end = r;
        if (end.length > 3) {
            let c = 4;
            while (r.length !== c) {
                block_width += 10;
                c++;
            }
        }
        r = StrToNum(r);
        function Count(r, end) {
            top_block = 0;
            while (r / 8 != 0) {
                if (r < 8) {
                    
                    element = r % 8;
                    result.push(element);

                    // markup HTML
                    let sub_result = document.createElement('div');

                    sub_result.classList.add('wrp-block');
                    sub_result.style.cssText = "display: flex; position: relative;";

                    let main_block = document.createElement('div');
                    main_block.classList.add('block');
                    let main_block2 = document.createElement('div');
                    main_block2.classList.add('block');

                    let span1 = document.createElement('span');
                    span1.classList.add('n1');
                    span1.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px;display: block;"
                    let span2 = document.createElement('span');
                    span2.classList.add('n2');
                    span2.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block;";
                    let span3 = document.createElement('span');
                    span3.classList.add('n3');
                    span3.style.cssText = "border-width: 0 0 3px 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block; padding-left: 4px;";
                    let span4 = document.createElement('span');
                    span4.classList.add('n4');
                    span4.style.cssText = "padding: 2px;";
                    //   
                    span1.innerHTML = r;
                    span2.innerHTML = 1 + '<span style="display:block; border: 2px solid red;"> ' + element + '</span>';
                    span3.innerHTML = 8;
                    

                    let sumbvol = '';
                    for (let i = (result.length - 1); i >= 0; i--) {
                        sumbvol += result[i];
                    }
                    block_result.appendChild(sub_result);
                    sub_result.appendChild(main_block);
                    main_block.appendChild(span1);
                    main_block.appendChild(span2);
                    sub_result.appendChild(main_block2);
                    main_block2.appendChild(span3);
                    main_block2.appendChild(span4);
                    if (end.length > 4) {
                        let block_count = document.getElementsByClassName('block');
                        console.log('true');
                        for (let i = 0; i < block_count.length; i++){
                            block_count[i].style.cssText = "min-width:" + block_width + 'px';
                        }
                    }
                    
                    left_block += block_width;
                    sub_result.style.top = top_block + 'px';
                    sub_result.style.left = left_block + 'px';
                    
                    top_block += block_height;
                    //   

                    const answer = document.createElement('p');
                    answer.style.cssText = "font-weight: 500; text-align: justify;; position:relative";
                    block_result.appendChild(answer);
                    answer.innerHTML= chrome.i18n.getMessage("Answer_ten");
                    answer.style.top = (top_block + 49) + 'px';

                    block_result.appendChild(main_result);
                    main_result.classList.add('b_result');
                    main_result.innerHTML = "<b>" + chrome.i18n.getMessage("Result") + "</b>" + end + "<sub>10</sub> " + "=" + sumbvol + " " + "<sub>8</sub>";
                    main_result.style.cssText = "position: relative;"
                    main_result.style.top = (top_block + 54) + 'px' ;

                    r = 0;
                    result = [];
                    left_block = 0;
                    top_block = 0;
                } else if (r % 8 == 0) {

                    element = 0;
                    result.push(element);
                    // markup HTML
                    let sub_result = document.createElement('div');

                    sub_result.classList.add('wrp-block');
                    sub_result.style.cssText = "display: flex; position: relative;";

                    let main_block = document.createElement('div');
                    main_block.classList.add('block');
                    let main_block2 = document.createElement('div');
                    main_block2.classList.add('block');

                    let span1 = document.createElement('span');
                    span1.classList.add('n1');
                    span1.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px;display: block;"
                    let span2 = document.createElement('span');
                    span2.classList.add('n2');
                    span2.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block;";
                    let span3 = document.createElement('span');
                    span3.classList.add('n3');
                    span3.style.cssText = "border-width: 0 0 3px 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block; padding-left: 4px;";
                    let span4 = document.createElement('span');
                    span4.classList.add('n4');
                    span4.style.cssText = "padding: 2px;";
                    // 

                    span1.innerHTML = r;
                    span3.innerHTML = 8;
                    r = r / 8;
                    span2.innerHTML = (r * 8) + '<span style="display:block; border: 2px solid red;">' + element + '</span>';
                    // append HTML
                    block_result.appendChild(sub_result);
                    sub_result.appendChild(main_block);
                    main_block.appendChild(span1);
                    main_block.appendChild(span2);
                    sub_result.appendChild(main_block2);
                    main_block2.appendChild(span3);
                    main_block2.appendChild(span4);
                    
                    left_block += block_width;
                    sub_result.style.top = top_block + 'px';
                    sub_result.style.left = left_block + 'px';
                    
                    top_block += block_height;
                    //  
                } else {
                    element = r % 8;
                    result.push(element);
                    
                    // markup HTML
                    let sub_result = document.createElement('div');

                    sub_result.classList.add('wrp-block');
                    sub_result.style.cssText = "display: flex; position: relative;";

                    let main_block = document.createElement('div');
                    main_block.classList.add('block');
                    let main_block2 = document.createElement('div');
                    main_block2.classList.add('block');

                    let span1 = document.createElement('span');
                    span1.classList.add('n1');
                    span1.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px;display: block;"
                    let span2 = document.createElement('span');
                    span2.classList.add('n2');
                    span2.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block;";
                    let span3 = document.createElement('span');
                    span3.classList.add('n3');
                    span3.style.cssText = "border-width: 0 0 3px 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block; padding-left: 4px;";
                    let span4 = document.createElement('span');
                    span4.classList.add('n4');
                    span4.style.cssText = "padding: 2px;";
                    // 
                    span1.innerHTML = r;
                    span2.innerHTML = element;
                    span3.innerHTML = 8;
                    
                    r = Math.floor(r / 8);
                    span2.innerHTML = (r * 8) + '<span style="display:block; border: 2px solid red;">' + element + '</span>';

                    // append HTML
                    block_result.appendChild(sub_result);
                    sub_result.appendChild(main_block);
                    main_block.appendChild(span1);
                    main_block.appendChild(span2);
                    sub_result.appendChild(main_block2);
                    main_block2.appendChild(span3);
                    main_block2.appendChild(span4);
                    
                    left_block += block_width;
                    sub_result.style.top = top_block + 'px';
                    sub_result.style.left = left_block + 'px';
                    
                    top_block += block_height;
                    //  
                }
            }
        }
        Count(r, end);
    } 
}
//

// 10 => 2;
function TenToTwo() {
    let r = document.getElementById('test').value;
    const description = document.createElement('p');
    description.style.cssText = "font-weight: 500; text-align: justify;"
    block_result.appendChild(description);
    description.innerHTML= chrome.i18n.getMessage("Description_binary");
    if (r !== '') {
        const end = r;
        if (end.length > 3) {
            let c = 4;
            while (r.length !== c) {
                block_width += 10;
                c++;
            }
        }
        r = StrToNum(r);
       
        function Count(r, end) {
            while (r / 2 != 0) {
                
                if (r == 1) {
                    
                    element = 1;
                    result.push(element);

                    let sumbvol = '';
                    for (let i = (result.length - 1); i >= 0; i--) {
                        sumbvol += result[i];
                    }
                    
                    // markup HTML
                    let sub_result = document.createElement('div');

                    sub_result.classList.add('wrp-block');
                    sub_result.style.cssText = "display: flex; position: relative;";

                    let main_block = document.createElement('div');
                    main_block.classList.add('block');
                    let main_block2 = document.createElement('div');
                    main_block2.classList.add('block');

                    let span1 = document.createElement('span');
                    span1.classList.add('n1');
                    span1.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px;display: block;"
                    let span2 = document.createElement('span');
                    span2.classList.add('n2');
                    span2.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block;";
                    let span3 = document.createElement('span');
                    span3.classList.add('n3');
                    span3.style.cssText = "border-width: 0 0 3px 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block; padding-left: 4px;";
                    let span4 = document.createElement('span');
                    span4.classList.add('n4');
                    span4.style.cssText = "padding: 2px;";
                    //   
                    span1.innerHTML = r;
                    span2.innerHTML = 1 + '<span style="display:block; border: 2px solid red;"> ' + element + '</span>';
                    span3.innerHTML = 2;
                    
                    // append HTML
                    block_result.appendChild(sub_result);
                    sub_result.appendChild(main_block);
                    main_block.appendChild(span1);
                    main_block.appendChild(span2);
                    sub_result.appendChild(main_block2);
                    main_block2.appendChild(span3);
                    main_block2.appendChild(span4);
                    if (end.length > 4) {
                        let block_count = document.getElementsByClassName('block');
                        console.log('true');
                        for (let i = 0; i < block_count.length; i++){
                            block_count[i].style.cssText = "min-width:" + block_width + 'px';
                        }
                    }
                    left_block += block_width;
                    sub_result.style.top = top_block + 'px';
                    sub_result.style.left = left_block + 'px';
                    
                    top_block += block_height;
                    //   

                    const answer = document.createElement('p');
                    answer.style.cssText = "font-weight: 500; text-align: justify;; position: relative;"
                    block_result.appendChild(answer);
                    answer.innerHTML= chrome.i18n.getMessage("Answer_ten");
                    answer.style.top = (top_block + 49) + 'px';


                    block_result.appendChild(main_result);
                    main_result.classList.add('b_result');
                    main_result.innerHTML = "<b>" + chrome.i18n.getMessage("Result") + "</b>" + end + "<sub>10</sub> " + " = " + sumbvol + "<sub>2</sub>";
                    main_result.style.cssText = "position: relative;"
                    main_result.style.top = (top_block + 54) + 'px' ;
                    r = 0;
                    result = [];
                    left_block = 0;
                    top_block = 0;
                   
                } else if (r % 2 == 0) {
                    element = 0;
                    result.push(element);
                    // markup HTML
                    let sub_result = document.createElement('div');

                    sub_result.classList.add('wrp-block');
                    sub_result.style.cssText = "display: flex; position: relative;";

                    let main_block = document.createElement('div');
                    main_block.classList.add('block');
                    let main_block2 = document.createElement('div');
                    main_block2.classList.add('block');

                    let span1 = document.createElement('span');
                    span1.classList.add('n1');
                    span1.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px;display: block;"
                    let span2 = document.createElement('span');
                    span2.classList.add('n2');
                    span2.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block;";
                    let span3 = document.createElement('span');
                    span3.classList.add('n3');
                    span3.style.cssText = "border-width: 0 0 3px 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block; padding-left: 4px;";
                    let span4 = document.createElement('span');
                    span4.classList.add('n4');
                    span4.style.cssText = "padding: 2px;";

                    //               
                    span1.innerHTML = r;
                    span3.innerHTML = 2;
                    r = r / 2;
                    span2.innerHTML = (r * 2) + '<span style="display:block; border: 2px solid red;">' + element + '</span>';
                    // append HTML
                    block_result.appendChild(sub_result);
                    sub_result.appendChild(main_block);
                    main_block.appendChild(span1);
                    main_block.appendChild(span2);
                    sub_result.appendChild(main_block2);
                    main_block2.appendChild(span3);
                    main_block2.appendChild(span4);
                    
                    left_block += block_width;
                    sub_result.style.top = top_block + 'px';
                    sub_result.style.left = left_block + 'px';
                    
                    top_block += block_height;
                    //                  

                } else if (r % 2 == 1) {
                    element = 1;
                    result.push(element);
                    // markup HTML
                    let sub_result = document.createElement('div');

                    sub_result.classList.add('wrp-block');
                    sub_result.style.cssText = "display: flex; position: relative;";

                    let main_block = document.createElement('div');
                    main_block.classList.add('block');
                    let main_block2 = document.createElement('div');
                    main_block2.classList.add('block');

                     let span1 = document.createElement('span');
                    span1.classList.add('n1');
                    span1.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px;display: block;"
                    let span2 = document.createElement('span');
                    span2.classList.add('n2');
                    span2.style.cssText = "border-width: 0 3px 0 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block;";
                    let span3 = document.createElement('span');
                    span3.classList.add('n3');
                    span3.style.cssText = "border-width: 0 0 3px 0; border-color: #96B97D; border-style: solid; min-height: 20px; display: block; padding-left: 4px;";
                    let span4 = document.createElement('span');
                    span4.classList.add('n4');
                    span4.style.cssText = "padding: 2px;";
                    // 
                    span1.innerHTML = r;
                    span3.innerHTML = 2;

                    r = (r - 1) / 2;
                    span2.innerHTML = (r * 2) + '<span style="display:block; border: 2px solid red;"> ' + element + '</span>';
                    // append HTML
                    block_result.appendChild(sub_result);
                    sub_result.appendChild(main_block);
                    main_block.appendChild(span1);
                    main_block.appendChild(span2);
                    sub_result.appendChild(main_block2);
                    main_block2.appendChild(span3);
                    main_block2.appendChild(span4);
                    
                    left_block += block_width;
                    sub_result.style.top = top_block + 'px';
                    sub_result.style.left = left_block + 'px';
                    
                    top_block += block_height;
                    // 
                }
            }
        }
        Count(r, end);
    } else {
        console.log('Variable EMPTY >>> :(');
    }
}
//

// Start 2 => 10 and 8 => 10
function backResult(reversed, end) {
    let number = 0;
    let lengthArray = reversed.length - 1;
    let b = 0;
    const descriptor = document.createElement('p');
    descriptor.style.cssText = "font-weight: 500; text-align: justify;"
    block_result.appendChild(descriptor);
    descriptor.innerHTML= chrome.i18n.getMessage("Rrsl");
    
    if (selectVar_1.value == '2' && selectVar_2.value == '10') {
        number = 2;
    } else if (selectVar_1.value == '8' && selectVar_2.value == '10') {
        number = 8;
    }
    for (let i = 0; i <= lengthArray; i++) {
        step += 1;
        // Step //
        let title_step = document.createElement('p');
        title_step.classList.add('step');
        block_result.appendChild(title_step);
        title_step.innerHTML = chrome.i18n.getMessage("Step") + step;
        // ---- //

        let sub_result = document.createElement('div');
        let main_block = document.createElement('div');
        // main_block.classList.add('block');
        let p1 = document.createElement('span');
        p1.classList.add('p1');
        p1.style.cssText = "border-bottom: 2px solid #90b575; padding-bottom: 3px;"
        let m2 = document.createElement('span');
        m2.classList.add('m2');

        block_result.appendChild(sub_result);
        sub_result.appendChild(main_block);
        main_block.appendChild(p1);
        main_block.appendChild(m2);
        let n = StrToNum(reversed[i]);
        let s = Math.pow(number, i);

        p1.innerHTML = '( ' + n + ' * ' + number + '<sup>' + i + '</sup>' + ' )' + '+' + b
        b = (n * s) + b;
        m2.innerHTML = "= " + b;
    }
    block_result.appendChild(main_result);
    main_result.innerHTML = "<b>" + chrome.i18n.getMessage("Result") + "</b>" + end + "<sub>" + number + "</sub>" + "= " + b + " " + "<sub>10</sub> ";
    main_result.style.top = 0;
    empty_row = '';
}
/// 

document.getElementById('press').addEventListener('click', Press, false);
function Press() {
    let printContents = document.getElementById('block-result').innerHTML;
    let css = '<link rel="stylesheet" href="template.css" type="text/css" />';
    let w = window.open('');
    w.document.write('<base href="' + location.origin + location.pathname + '">');
    w.document.write(css);
    w.document.write('<style type="text/css">.n1{width: 100%;}</style>');
    w.document.write('</head><body >');
    w.document.write(printContents);
    w.document.write('</body></html>');
    w.print();
}
function StrToNum(a) {
    a = parseInt(a);
    return a;
}

document.getElementsByClassName('span-text')[0].innerText = chrome.i18n.getMessage("First_text");
document.getElementsByClassName('span-text')[1].innerText = chrome.i18n.getMessage("Second_text");
document.getElementsByClassName('span-text')[2].innerText = chrome.i18n.getMessage("Third_text");
document.getElementById('btn').value = chrome.i18n.getMessage("Button");