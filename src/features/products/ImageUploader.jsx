import React from 'react';
import ImageUploading from 'react-images-uploading';
import Button from '../../ui/Button';
import { useUploadImages } from './useUploadImages';
import { supabaseUrl } from '../../services/supabase';
import toast from 'react-hot-toast';

export default function ImageUploader() {
  const [images, setImages] = React.useState();
  const maxNumber = 69;
  const { status, mutateUploadImages, isSuccess } = useUploadImages();

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  function handleUploadImages() {
    images.forEach((image) => {
      if (!image.file) return;
      const imageName =
        `${image.file.size}-${image.file.lastModified}`.replaceAll('/', '-');

      const imagePath = `${supabaseUrl}/storage/v1/object/public/gallery${imageName}`;

      mutateUploadImages({ data: image.file });
    });
  }

  function handleCopyUrl(data) {
    const imageName = `${data.file.size}-${data.file.lastModified}`;

    const imagePath = `${supabaseUrl}/storage/v1/object/public/gallery/${imageName}`;

    navigator.clipboard.writeText(imagePath);
    toast.success('URL copied to clipboard');
  }

  return (
    <div className='flex'>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className='flex flex-col gap-4'>
            <div className='flex w-full'>
              <div
                className='px-6 text-center text-gray-100 bg-slate-800 rounded flex justify-center items-center hover:cursor-pointer'
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </div>
              &nbsp;
              <Button
                onClick={onImageRemoveAll}
                type='button'
                size='small'
                vat
                className='mx-4'
                variation='danger'
              >
                Remove all images
              </Button>
              <Button size='medium' type='button' onClick={handleUploadImages}>
                Start upload
              </Button>
            </div>
            <div className='flex gap-10'>
              {images &&
                images.map((image, index) => {
                  return (
                    <div key={index} className='flex flex-col justify-between'>
                      <img
                        src={image['data_url'] || image['url']}
                        alt=''
                        width='100'
                        className='object-cover object-top'
                      />
                      <div className='flex flex-col gap-2 mt-2'>
                        {/* <Button
                      size='small'
                      onClick={() => {
                        handleDeleteImage(image.file);
                        onImageUpdate(index);
                      }}
                      type='button'
                    >
                      Update
                    </Button> */}
                        <Button
                          onClick={() => {
                            onImageRemove(index);
                          }}
                          type='button'
                          size='small'
                        >
                          Remove
                        </Button>
                        {isSuccess && (
                          <Button
                            type='button'
                            size='small'
                            onClick={() => handleCopyUrl(image)}
                          >
                            Get URL
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
