import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Textarea } from '@chakra-ui/react';

const MarkdownEditor: React.FC<{ initialValue?: string; onSave: (value: string) => void }> = ({ initialValue = '', onSave }) => {
    const [value, setValue] = useState(initialValue);

    const handleSave = () => {
        onSave(value);
    };

    return (
        <div>
            <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write your markdown here..."
                size="lg"
                resize="vertical"
            />
            <Button onClick={handleSave} colorScheme="teal" mt={4}>
                Save
            </Button>
            <div style={{ marginTop: '20px' }}>
                <ReactMarkdown>{value}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownEditor;