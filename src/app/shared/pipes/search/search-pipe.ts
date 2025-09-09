import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], keyword:string, searchWord:string): any {
    if(keyword === 'products'){
      return list.filter((item)=> item.title.toLowerCase().includes(searchWord.toLowerCase()));
    }
    else if (keyword === 'categories' || keyword === 'brands'){
      return list.filter((item)=> item.name.toLowerCase().includes(searchWord.toLowerCase()));
    }
  }

}
