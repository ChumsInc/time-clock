export default function LocaleDate({ts}: { ts?: number|null }) {
    if (!ts) {
        return null;
    }
    return <>{new Date(ts * 1000).toLocaleDateString()}</>;
}
