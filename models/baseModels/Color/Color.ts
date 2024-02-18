import { Doc } from 'fyo/model/doc';
import { ListViewSettings } from 'fyo/model/types';

export class Color extends Doc {
  static getListViewSettings(): ListViewSettings {
    return { columns: ['name','hexvalue'] };
  }
}
