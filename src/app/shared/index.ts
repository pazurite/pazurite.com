import Vue from 'vue';
import { textCaseConverter } from '@/utils/converter';
import { TextCase } from '@/constants/enums';

await Promise.all(
  require
    .context('@s/elements', false, /\.vue$/)
    .keys()
    .map(async (path: string) => {
      const fileName = path.replace(/\.\//g, '');

      const componentId = textCaseConverter(fileName.replace(/\.vue/g, ''), {
        from: TextCase.PASCAL,
        to: TextCase.KEBAB,
      });

      const componentSfc = await import('@s/elements/' + fileName);

      Vue.component(componentId, componentSfc.default);
    })
);
