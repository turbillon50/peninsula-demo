'use client'
import { create } from 'zustand'
interface CartItem { id:string; nombre:string; precio:number; qty:number; img?:string }
interface Store {
  carrito: CartItem[]
  addItem: (item:{id:string;nombre:string;precio:number}) => void
  updateQty: (id:string,qty:number) => void
  remove: (id:string) => void
  clear: () => void
}
export const useStore = create<Store>((set) => ({
  carrito: [],
  addItem: (item) => set(s => {
    const ex = s.carrito.find(c=>c.id===item.id)
    return ex
      ? {carrito:s.carrito.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c)}
      : {carrito:[...s.carrito,{...item,qty:1}]}
  }),
  updateQty: (id,qty) => set(s=>({carrito:s.carrito.map(c=>c.id===id?{...c,qty}:c)})),
  remove: (id) => set(s=>({carrito:s.carrito.filter(c=>c.id!==id)})),
  clear: () => set({carrito:[]}),
}))
