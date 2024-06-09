import { useCurrentEditor } from '@tiptap/react';

function ProductDescription() {
  const { editor } = useCurrentEditor();
  console.log('editor:', editor);
  return <div></div>;
}

export default ProductDescription;
