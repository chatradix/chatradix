import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Send, Play, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputCommand, setInputCommand] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', text: 'ChatRadix Architectural CLI [Version 2.4.0-release]' },
    { type: 'system', text: 'Type "help" or click presets below to execute commands.\n' },
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs: LogEntry[] = [...logs, { type: 'input', text: `$ ${cmdStr}` }];

    switch (trimmed) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  help        - Display command manifest
  status      - Query real-time WhatsApp Cloud API status
  flows       - List pre-configured flow sequence IDs
  initialize  - Trigger shopify webhook setup simulation
  version     - Show system build hash & environment
  clear       - Clear screen buffer`,
        });
        break;

      case 'status':
        newLogs.push({
          type: 'success',
          text: `[SYSTEM STATUS: OPERATIONAL]
  WhatsApp Cloud API:   CONNECTED (v19.0)
  Shopify Webhooks:     LISTENING (0 drop)
  Latency:              38ms
  Active Tenants:       1,482 stores`,
        });
        break;

      case 'flows':
        newLogs.push({
          type: 'output',
          text: `[REGISTERED FLOW SEQUENCES]
  SEQ_01: Abandoned Checkout Recovery
  SEQ_02: Shipping & Tracking Dispatch
  SEQ_03: Post-Purchase Upsell Trigger
  SEQ_04: Back-In-Stock Inventory Sync
  SEQ_05: Cash-On-Delivery Verification
  SEQ_06: VIP Customer Winback Protocol`,
        });
        break;

      case 'initialize':
        newLogs.push({
          type: 'success',
          text: `[INITIALIZATION STARTED]
  > Authenticating with Shopify Partner API... [OK]
  > Verifying Webhook Secret Key... [OK]
  > Binding WhatsApp Business Account (WABA)... [OK]
  > System Ready! 2 Months Free Trial Activated.`,
        });
        break;

      case 'version':
        newLogs.push({
          type: 'output',
          text: 'ChatRadix Engine v2.4.0-deep-neutral (build #99281a)',
        });
        break;

      case 'clear':
        setLogs([]);
        setInputCommand('');
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" for valid options.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputCommand('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(inputCommand);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0e0e0e] border border-[#0080FB] w-full max-w-3xl h-[80vh] flex flex-col shadow-[0_0_50px_rgba(0,128,251,0.3)]">
        {/* Terminal Header */}
        <div className="bg-[#131313] border-b border-[#262626] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TerminalIcon className="w-4 h-4 text-[#0080FB]" />
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#e5e2e1] uppercase tracking-widest">
              ChatRadix_Terminal_Console v2.4.0
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#888888] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Console Log Buffer */}
        <div className="flex-1 p-6 overflow-y-auto font-['JetBrains_Mono'] text-xs space-y-3 selection:bg-[#0080FB] selection:text-white">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`whitespace-pre-wrap leading-relaxed ${
                log.type === 'input'
                  ? 'text-white font-bold'
                  : log.type === 'success'
                  ? 'text-[#25D366]'
                  : log.type === 'error'
                  ? 'text-[#ffb4ab]'
                  : log.type === 'system'
                  ? 'text-[#0080FB]'
                  : 'text-[#c1c6d6]'
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Preset Command Chips */}
        <div className="bg-[#131313] border-t border-[#262626] px-4 py-2 flex items-center gap-2 overflow-x-auto hide-scroll">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#888888] uppercase tracking-wider shrink-0">
            QUICK RUN:
          </span>
          {['help', 'status', 'flows', 'initialize', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runCommand(cmd)}
              className="bg-[#0e0e0e] border border-[#262626] hover:border-[#0080FB] text-[#c1c6d6] hover:text-[#0080FB] px-3 py-1 font-['JetBrains_Mono'] text-[11px] uppercase transition-colors shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Interactive Command Prompt Form */}
        <form onSubmit={handleFormSubmit} className="bg-[#0e0e0e] border-t border-[#262626] p-4 flex items-center gap-3">
          <span className="text-[#0080FB] font-['JetBrains_Mono'] font-bold text-sm">$</span>
          <input
            type="text"
            autoFocus
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            placeholder="Type command ('help', 'status', 'flows')..."
            className="flex-1 bg-transparent border-none p-0 font-['JetBrains_Mono'] text-xs text-white focus:outline-none focus:ring-0 placeholder:text-[#353534]"
          />
          <button
            type="submit"
            className="bg-[#0080FB] text-white p-2 hover:bg-white hover:text-[#0080FB] transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
