@component('mail::message')
# Pedido confirmado

Hola {{ $order->user->name }},

Tu pedido ha sido recibido correctamente. Aquí tienes los detalles más importantes:

**ID de pedido:** {{ $order->id }}  
**Total:** ${{ number_format($order->total, 2) }}  
**Tipo de envío:** {{ ucfirst($order->note) }}  
**Fecha de entrega:** {{ $order->delivery_date ?? 'N/A' }}  
**Hora de entrega:** {{ $order->delivery_time ?? 'N/A' }}

@component('mail::table')
| Producto | Cantidad | Precio | Subtotal |
|----------|----------|-------|---------|
@foreach ($items as $item)
| {{ $item->product->name }} | {{ $item->quantity }} | ${{ number_format($item->price, 2) }} | ${{ number_format($item->subtotal, 2) }} |
@endforeach
@endcomponent

Gracias por comprar con nosotros!

@endcomponent
