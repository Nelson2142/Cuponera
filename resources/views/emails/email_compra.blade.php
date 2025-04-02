<!DOCTYPE html>
<html>

<head>
    <title>Confirmación de compra</title>
</head>

<body>
    <h1>¡Hola! 😁</h1>
    <p>Estimado cliente, notificarle que tu compra ah sido un exito, puedes visitar la empresa ofertante y canjear tu cupón.</p>
    <p>Detalles de tu compra:</p>
    <ul>
        <li><strong>Nombre:</strong> {{ $cliente->nombre }}</li>
        <li><strong>Email:</strong> {{ $cliente->email }}</li>
        <li><strong>Empresa:</strong> {{ $oferta->empresa->nombre }}</li>
        <li><strong>Descripción:</strong> {{ $oferta->descripcion }}</li>
        <li><strong>Código de cupón:</strong> {{ $cupon->codigo }}</li>
        <li><strong>Fecha de compra:</strong> {{ $cupon->fecha_compra }}</li>
        <li><strong>Fecha de vencimiento:</strong> {{ $oferta->fecha_limite_cupon }}</li>
        <li><strong>Precio:</strong> ${{ $cupon->monto }}</li>
    </ul>
    <p>Recuerda que el código es único. ¡No lo compartas con nadie!</p>
    <p>¡Gracias por tu compra!</p>
    <p>Saludos. 👋</p>
</body>

</html>