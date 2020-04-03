import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Helper.extend({
  init() {
    this._super(...arguments);
    this.get('responsive').on('mediaChanged', () => {
      this.recompute();
    });
  },

  responsive: service(),

  compute([prop]) {
    return get(this, `responsive.${prop}`);
  }
});
