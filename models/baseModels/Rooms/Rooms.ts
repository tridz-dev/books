import { Doc } from 'fyo/model/doc';
import { ListViewSettings } from 'fyo/model/types';

export class Rooms  extends Doc{

  static getListViewSettings(): ListViewSettings {
    return {
      columns: [
        'number',
        'name',
        'capacity',
      ],
    };
  }
}
