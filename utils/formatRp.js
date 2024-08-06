export function formatRupiah(value) {
    const numberValue = parseFloat(value); 
    return `Rp. ${numberValue.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}