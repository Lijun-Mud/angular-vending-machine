export default function (callback,...messages) {
    let msgs = messages.map((x = "undefined") => {
        console.log(x);
        return getObjectInfo(x);
    });
    const message = msgs.map(x => x.toString()).join('\t');
    if (callback) {
        callback(message);
    }
} 

var getObjectInfo = (obj) => {
    if (typeof obj !== "object") return obj;
    if (obj.constructor=== Array || obj.constructor=== Set) return [...obj];
    let msg = "";
    for (let i in obj) {
        msg += `\t${i} : ${obj[i]}`;
    }
    return msg;
}


