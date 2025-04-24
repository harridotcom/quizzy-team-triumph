
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={`gap-2 ${className}`} 
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check size={16} />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
};

export default CopyButton;
