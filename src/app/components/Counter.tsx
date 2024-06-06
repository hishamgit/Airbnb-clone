"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";


export default function Counter({name}:{name: string}) {
  const [amount, setAmount] = useState(0);
  return (
    
    <div className="flex items-center gap-x-3">
        <input type="hidden" value={amount} name={name}/>
      <Button variant="outline" size="icon" type="button">
        <Minus
          onClick={() => {
            if (amount > 0) setAmount(amount - 1);
          }}
          className="w-4 h-4 text-primary"
        />
      </Button>
      <p className="font-medium">{amount}</p>
      <Button variant="outline" size="icon" type="button">
        <Plus
          onClick={() => setAmount(amount + 1)}
          className="w-4 h-4 text-primary"
        />
      </Button>
    </div>
  );
}
