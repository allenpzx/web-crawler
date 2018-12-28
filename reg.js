const str = 'python php ruby javascript jsonp perhapsphpisoutdated';
// const reg = /\b(?=\w*p)(?!\w*ph)\w+\b/g;
const reg = /\b(?=\w*p)(?!\w*ph)\w*\b/g;
const results = str.match(reg);
console.log(results);