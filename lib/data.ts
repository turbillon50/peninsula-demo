
export interface Producto {
  id: string; nombre: string; volumen: string; precio: number
  descripcion: string; img: string; imgCat: string; popular: boolean
}
export interface Pedido {
  id: string; cliente: string; direccion: string; productos: string
  total: number; estado: 'Pendiente'|'En camino'|'Entregado'|'Cancelado'
  fecha: string; hora: string; repartidor: string; telefono: string
}
export interface Cliente {
  id: string; nombre: string; direccion: string; telefono: string
  pedidosTotal: number; gastoTotal: number; frecuente: boolean; avatar: number
}
export interface Repartidor {
  id: string; nombre: string; zona: string; pedidosHoy: number
  entregados: number; avatar: number; activo: boolean
}

export const PRODUCTOS: Producto[] = [
  { id:'p1', nombre:'Garrafón 20L', volumen:'20 Litros', precio:30,
    descripcion:'Agua purificada en proceso de osmosis inversa y UV. El clásico para casa y oficina. Refresca tu hogar con el mejor agua del suréste.',
    img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_5335b72f-3f39-4b75-9757-6ab40e96a18a.png', imgCat:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_5335b72f-3f39-4b75-9757-6ab40e96a18a.png', popular:true },
  { id:'p2', nombre:'Pack 5 Garrafones 20L', volumen:'100 Litros', precio:135,
    descripcion:'Pack semanal para familia o negocio. Ahorra $15 vs precio unitario. Ideal para oficinas y casas con más de 4 personas.',
    img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_e4700287-8921-4692-b9e0-9b778e20fe31.png', imgCat:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_e4700287-8921-4692-b9e0-9b778e20fe31.png', popular:true },
  { id:'p3', nombre:'Botella personal 1.5L', volumen:'1.5 Litros', precio:12,
    descripcion:'Botella personal para llevar. Agua purificada con triple filtrado. Perfecta para el gym, la oficina o el carro.',
    img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034038_350f1382-22dc-4df3-b9be-2f8950d032aa.png', imgCat:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034038_350f1382-22dc-4df3-b9be-2f8950d032aa.png', popular:false },
  { id:'p4', nombre:'Garrafón 11L', volumen:'11 Litros', precio:20,
    descripcion:'Tamaño compacto ideal para refrigerador o espacios pequeños. Cabe en cualquier dispensador estándar.',
    img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_5335b72f-3f39-4b75-9757-6ab40e96a18a.png', imgCat:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_5335b72f-3f39-4b75-9757-6ab40e96a18a.png', popular:false },
  { id:'p5', nombre:'Dispensador de agua', volumen:'Accesorio', precio:350,
    descripcion:'Dispensador base para garrafón 20L. Frío y caliente. Con llave triple y bandeja extraible. Acero inoxidable.',
    img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034038_60367273-8d3f-4b40-ae3a-88ebab75c5e1.png', imgCat:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034038_60367273-8d3f-4b40-ae3a-88ebab75c5e1.png', popular:false },
]

export const CATS = [
  { label:'Garrafón 20L', sub:'Desde $30',   img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_5335b72f-3f39-4b75-9757-6ab40e96a18a.png',  href:'/catalogo?cat=garafon' },
  { label:'Pack familiar',  sub:'Desde $135',  img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034037_e4700287-8921-4692-b9e0-9b778e20fe31.png', href:'/catalogo?cat=pack' },
  { label:'Botella 1.5L',   sub:'Desde $12',   img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034038_350f1382-22dc-4df3-b9be-2f8950d032aa.png',  href:'/catalogo?cat=botella' },
  { label:'Dispensador',    sub:'Desde $350',  img:'https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260615_034038_60367273-8d3f-4b40-ae3a-88ebab75c5e1.png', href:'/catalogo?cat=accesorio' },
]

export const PEDIDOS: Pedido[] = [
  { id:'q1', cliente:'María García', direccion:'Av. Tulum 142, Col. Centro', productos:'2x Garrafón 20L', total:60, estado:'En camino', fecha:'15/06/25', hora:'10:30', repartidor:'Carlos M.', telefono:'+52 998 123 4567' },
  { id:'q2', cliente:'Roberto Solis', direccion:'Calle Coral 88, SM 27', productos:'Pack 5 garrafones', total:135, estado:'Pendiente', fecha:'15/06/25', hora:'11:00', repartidor:'Miguel R.', telefono:'+52 998 234 5678' },
  { id:'q3', cliente:'Ana Torres', direccion:'Blvd. Kukulcán Km 9', productos:'1x Garrafón 20L, 4x Botella 1.5L', total:78, estado:'Entregado', fecha:'15/06/25', hora:'09:15', repartidor:'Carlos M.', telefono:'+52 998 345 6789' },
  { id:'q4', cliente:'Hotel Mar Azul', direccion:'Zona Hotelera Km 14', productos:'10x Garrafón 20L', total:300, estado:'Entregado', fecha:'15/06/25', hora:'08:00', repartidor:'Miguel R.', telefono:'+52 998 456 7890' },
  { id:'q5', cliente:'Farmacia San Pablo', direccion:'Av. Lázaro Cárdenas 45', productos:'Pack 5 garrafones', total:135, estado:'Pendiente', fecha:'15/06/25', hora:'12:00', repartidor:'Sin asignar', telefono:'+52 998 567 8901' },
  { id:'q6', cliente:'Claudia Mendez', direccion:'Sm 64 Mz 12 Lt 3', productos:'1x Dispensador, 2x Garrafón', total:410, estado:'En camino', fecha:'15/06/25', hora:'11:45', repartidor:'Carlos M.', telefono:'+52 998 678 9012' },
]

export const CLIENTES: Cliente[] = [
  { id:'c1', nombre:'María García', direccion:'Av. Tulum 142, Centro', telefono:'+52 998 123 4567', pedidosTotal:24, gastoTotal:720, frecuente:true, avatar:26 },
  { id:'c2', nombre:'Hotel Mar Azul', direccion:'Zona Hotelera Km 14', telefono:'+52 998 456 7890', pedidosTotal:48, gastoTotal:14400, frecuente:true, avatar:57 },
  { id:'c3', nombre:'Farmacia San Pablo', direccion:'Av. Lázaro Cárdenas 45', telefono:'+52 998 567 8901', pedidosTotal:16, gastoTotal:2160, frecuente:true, avatar:41 },
  { id:'c4', nombre:'Roberto Solis', direccion:'Calle Coral 88, SM 27', telefono:'+52 998 234 5678', pedidosTotal:8, gastoTotal:1080, frecuente:false, avatar:33 },
  { id:'c5', nombre:'Ana Torres', direccion:'Blvd. Kukulcán Km 9', telefono:'+52 998 345 6789', pedidosTotal:12, gastoTotal:936, frecuente:true, avatar:44 },
]

export const REPARTIDORES: Repartidor[] = [
  { id:'r1', nombre:'Carlos Martínez', zona:'Centro / SM 1-20', pedidosHoy:8, entregados:5, avatar:32, activo:true },
  { id:'r2', nombre:'Miguel Rodríguez', zona:'Zona Hotelera / SM 21-40', pedidosHoy:6, entregados:4, avatar:15, activo:true },
]

export const KPI = {
  pedidosHoy:12, entregados:9, pendientes:3, ingresoHoy:2340,
  clientesActivos:48, garrafonesSemana:210,
}

export const CHART_SEMANA = [
  {d:'Lun',v:1800},{d:'Mar',v:2100},{d:'Mie',v:1650},
  {d:'Jue',v:2400},{d:'Vie',v:2800},{d:'Sab',v:3200},{d:'Dom',v:1200},
]
