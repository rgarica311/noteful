export default function findFolderId(arr, attr, value) {
  for(let j=0; j<arr.length; j++) {
    if(arr[j][attr] === value){
      return j
    }
  }
  return -1
}
