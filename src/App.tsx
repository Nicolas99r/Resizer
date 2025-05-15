import React, { useState, useRef } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import { Copy, Check } from "lucide-react";
import { useToast, ToastProvider } from "./hooks/useToast";

const App = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [factor, setFactor] = useState<"0.5x" | "0.25x">("0.5x");
  const [isCopied, setIsCopied] = useState(false);
  const result = number !== null ? (factor === "0.5x" ? number / 2 : number / 4) : 0;
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setNumber(null);
    } else {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) setNumber(parsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCopy();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.toString());
    setIsCopied(true);
    toast({ title: "Copiado!", description: result.toString() });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="glassmorph w-full max-w-md bg-primary p-6 rounded-xl shadow-lg space-y-6">
          <h1 className="text-2xl font-black text-center text-foreground">Calcular Mitad (o cuarto)</h1>

          <div>
            <label className="block text-lg font-bold mb-1 text-muted">Número</label>
            <Input
              type="number"
              placeholder="Ej: 100"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-lg font-bold mb-1 text-muted">Factor</label>
            <select
              value={factor}
              onChange={(e) =>
                setFactor(e.target.value as "0.5x" | "0.25x")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="0.5x">0.5x (Dividir entre 2)</option>
              <option value="0.25x">0.25x (Dividir entre 4)</option>
            </select>
          </div>

          <div className="bg-secondary p-4 rounded-md text-center">
            <p className="text-lg font-bold text-foreground">
              Resultado:{" "}
              <span className="text-accent">{result.toLocaleString()}</span>
            </p>
          </div>

          <Button 
            onClick={handleCopy} 
            disabled={isCopied} 
            className="w-full bg-[#38a3a5] group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_#207879] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
          >
            {isCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copiado!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copiar resultado
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default function WrappedApp() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}