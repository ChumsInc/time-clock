import type {ReactNode} from "react";

export interface EntryTimeProps {
    ts?: number|null
    fallback?: string|ReactNode;
}
export default function LocaleTime({ts, fallback}: EntryTimeProps) {
    if (!ts) {
        return fallback ?? null;
    }
    return <>{new Date(ts * 1000).toLocaleTimeString()}</>;
}
