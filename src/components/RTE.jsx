//Real Time Editor
import React from 'react'
import {Controller} from 'react-hook-form'
import {Editor } from '@tinymce/tinymce-react';


function RTE({name, control, label, 
    defaultValue = ""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller 
        name = {name || "content"}
        control = {control}
        render = {({field: {onChange}}) => (
            <Editor
            apiKey='b8ty3o1vc3yqwxk5d26ns8ehmr6t823pfxa9rmluw60l2roa'
            initialValue={defaultValue}
            init = {{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount'
                  ],
                  
                toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE