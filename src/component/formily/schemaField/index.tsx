import { easyCreateSchemaField } from '@byted/easy-formily';
import { FormItem, FormLayout, Input, Select } from '@formily/semi';

export const SchemaField = easyCreateSchemaField({
  /** 注册组件，同 createSchemaField */
  components: {
    // 输入组件
    Input,
    Select,

    // 样式组件
    FormItem,
    FormLayout,
  },
  /** 注册全局变量，同 createSchemaField */
  scope: {},
  /** 注册组件 props，EasyFormily 新增能力 */
  componentPropsMap: {},
});
