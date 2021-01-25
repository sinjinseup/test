# hotseller
code test

### start 하는 방법
```cmd
cd code
npm start
```
### npm version 
```npm
react-router-dom : 5.2.0
react : 17.0.1
```


const fileName = props.match.params.id+'.json';
    
console.log(fileName);

const url = './hotseller-dataset/pretty/hashtag_info/'+fileName;
console.log(url);

axios.get(url).then(res => console.log(res)).catch(e => console.log(e));
