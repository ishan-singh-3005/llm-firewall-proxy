import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { User, Bot, AlertTriangle, Shield } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isBlocked?: boolean;
  isProtected?: boolean;
  timestamp?: string;
  className?: string;
}

export const ChatMessage = ({ 
  message, 
  isUser, 
  isBlocked = false, 
  isProtected = false,
  timestamp,
  className 
}: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 max-w-[80%]",
      isUser ? "ml-auto flex-row-reverse" : "mr-auto",
      className
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-secondary-foreground"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={cn(
        "space-y-2",
        isUser ? "text-right" : "text-left"
      )}>
        <div className={cn(
          "inline-block px-4 py-2 rounded-lg transition-smooth",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : isBlocked
              ? "bg-destructive/20 border border-destructive text-destructive rounded-tl-sm"
              : "bg-secondary text-secondary-foreground rounded-tl-sm"
        )}>
          <p className="text-sm">{message}</p>
          
          {isBlocked && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-destructive/30">
              <AlertTriangle className="w-3 h-3" />
              <span className="text-xs">Message blocked by firewall</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {timestamp && <span>{timestamp}</span>}
          {isProtected && !isUser && (
            <Badge variant="success" className="text-[10px] px-1.5 py-0.5">
              <Shield className="w-2 h-2 mr-1" />
              Protected
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};