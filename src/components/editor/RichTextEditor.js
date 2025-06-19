import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const RichTextEditor = ({ value, onChange, placeholder = 'اكتب المحتوى هنا...', height = '300px' }) => {
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            ['blockquote', 'code-block'],
            ['clean']
        ],
    }), []);
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'background',
        'align', 'code-block'
    ];
    return (_jsx("div", { className: "bg-white rounded-lg border", children: _jsx(ReactQuill, { theme: "snow", value: value, onChange: onChange, modules: modules, formats: formats, placeholder: placeholder, style: {
                height: height,
                direction: 'rtl'
            } }) }));
};
export default RichTextEditor;
