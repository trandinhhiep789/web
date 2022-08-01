export const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",", symbolSign) => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";
        const currencySymbol = symbolSign ? symbolSign : ""
        let amountConvert = amount.toString().replace(new RegExp(thousands, 'g'), "")
        let i = parseInt(amountConvert = Math.abs(Number(amountConvert) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return currencySymbol + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amountConvert - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

export const thousandNum = (num = 0) => {
    const str = (+num).toString().split(".");
    const int = nums => nums.split("").reverse().reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
    const dec = nums => nums.split("").reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
    return str.length > 1 ? `${int(str[0])}.${(str[1])}` : int(str[0]);
}

export const formatNumber = (num) => {
    if (num != undefined && num != '') {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    else {
        return num
    }

}

export const formatNumberNew = (num) => {
    const parNum = num.toString();
    let numSplt = parNum.split('.');
    if (num != undefined && num != '') {

        if (numSplt.length > 1) {
            let intTwoNum = 0;
            const compase = parseInt(numSplt[1].substr(2, 1));
            if (numSplt[1].length > 2 && compase > 5) {
                intTwoNum = parseInt(numSplt[1].substr(0, 2)) + 1;
            }
            else {
                intTwoNum = numSplt[1].substr(0, 2);
            }

            return numSplt[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "." + intTwoNum.toString();
        }
        else {
            return numSplt[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

    }
    else {
        return num
    }

}

export const toIsoStringAnt = (dateTime) => {
       
        // const dateTime1 = new Date(dateTime);
        const aaaa =  dateTime.split(" ");
        // console.log("aa",dateTime, dateTime1, aaaa )
        return aaaa[0] + 'T' + aaaa[1];
}

export const toIsoStringCus = (dateTime) => {
    const dateTime1 = new Date(dateTime);
    const a = new Date();
    const tzo = a.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = function (num) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return dateTime1.getFullYear() +
        '-' + pad(dateTime1.getMonth() + 1) +
        '-' + pad(dateTime1.getDate()) +
        'T' + pad(a.getHours()) +
        ':' + pad(a.getMinutes()) +
        ':' + pad(a.getSeconds())
}

export const toIsoStringCusNew = (dateTime, notGetTime) => {
    const dateTime1 = new Date(dateTime);
    const a = new Date();
    const tzo = a.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = function (num) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };


    if (notGetTime) {
        return dateTime1.getFullYear() +
            '-' + pad(dateTime1.getMonth() + 1) +
            '-' + pad(dateTime1.getDate()) +
            'T' + pad(a.getHours()) +
            ':' + pad(a.getMinutes()) +
            ':' + pad(a.getSeconds())
    }
    else {
        return dateTime1.getFullYear() +
            '-' + pad(dateTime1.getMonth() + 1) +
            '-' + pad(dateTime1.getDate()) +
            'T' + "00" +
            ':' + "00"

    }
}


export const toIsoStringNew = (dateTime, notGetTime) => {
    let dateTemp = dateTime.split('/');
    const a = new Date();
    if (notGetTime) {
        return dateTemp[2] +
            '-' + dateTemp[1] +
            '-' + dateTemp[0] +
            'T' + pad(a.getHours()) +
            ':' + pad(a.getMinutes()) +
            ':' + pad(a.getSeconds())
    }
    else {
        return dateTemp[2] +
            '-' + dateTemp[1] +
            '-' + dateTemp[0] +
            'T' + "00" +
            ':' + "00"
    }
}

export const dateToLocalISO = (date) => {
    const off = date.getTimezoneOffset()
    const absoff = Math.abs(off)
    return (new Date(date.getTime() - off * 60 * 1000).toISOString().substr(0, 23) +
        (off > 0 ? '-' : '+') +
        (absoff / 60).toFixed(0).padStart(2, '0') + ':' +
        (absoff % 60).toString().padStart(2, '0'))
}

// export const numberWithComma = (data, comma = ",") => {
//     return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, comma)
// }

export const numberDecimalWithComma = (nStr) => {
    nStr += "";
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}

export const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + " phút " + (seconds < 10 ? '0' : '') + seconds;
}