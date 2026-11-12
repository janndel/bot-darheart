function ejemplosPanel() {
    return [
        {
            nombre: '1. Minimalista limpio',
            texto:
`PANEL — DARHEART DEMO

Miembros: 147
Admins: 3
Mensajes: 8719
Top: Usuario top (2829)
Inactivos: 1
Última actividad: 02:04
Filtros: Antilink`
        },
        {
            nombre: '2. Tarjeta ASCII',
            texto:
`╭─────────────────────────╮
│   PANEL DE CONTROL      │
│   DARHEART DEMO         │
├─────────────────────────┤
│ Miembros         147    │
│ Admins             3    │
│ Mensajes        8719    │
│ Inactivos          1    │
├─────────────────────────┤
│ Top: Usuario top (2829) │
│ Última: 02:04           │
╰─────────────────────────╯`
        },
        {
            nombre: '3. Dashboard visual',
            texto:
`PANEL — DARHEART DEMO

Actividad por admin
Admin A  ██████████░░░░  68%
Admin B  █████░░░░░░░░░  34%
Admin C  ██░░░░░░░░░░░░  12%

Miembros: 147 · Activos: 146
Inactivos: 1 (0.7%)
Última actividad: 02:04`
        },
        {
            nombre: '4. Compacto',
            texto:
`PANEL · DARHEART DEMO
147 miembros · 3 admins · 8719 msj
Top: Usuario top (2829) · Inactivos: 1
Última: 02:04 · Filtros: Antilink`
        },
        {
            nombre: '5. Consola / hacker',
            texto:
'```\n[PANEL]   DARHEART DEMO\n[STATS]   miembros=147 admins=3 mensajes=8719\n[TOP]     usuario_top=2829\n[INACTIVOS] 1\n[ULTIMA]  02:04\n[FILTROS] antilink\n[STATUS]  online\n```'
        },
        {
            nombre: '6. Premium',
            texto:
`━━━━━━━━━━━━━━━━━━━━━━
    DARHEART · PANEL
    DARHEART DEMO
━━━━━━━━━━━━━━━━━━━━━━
Miembros: 147
Admins: 3
Mensajes: 8719
Promedio: 60 msg/activo
Top: Usuario top (2829)
Inactivos: 1
Última actividad: 02:04
━━━━━━━━━━━━━━━━━━━━━━
Filtros: Antilink
━━━━━━━━━━━━━━━━━━━━━━
Comandos: ,topactivos ,reporte
━━━━━━━━━━━━━━━━━━━━━━`
        },
        {
            nombre: '7. Tabla alineada',
            texto:
`PANEL — DARHEART DEMO

Métrica        Valor
────────────────────────
Miembros         147
Admins             3
Mensajes        8719
Inactivos          1
Última          02:04
Top      Usuario top (2829)`
        },
        {
            nombre: '8. Neón (formato WhatsApp)',
            texto:
`*_PANEL DE CONTROL_*
» *DARHEART DEMO*
────────────────
*Miembros:* 147
*Admins:* 3
*Mensajes:* 8719
*Top:* ~Usuario top~ (2829)
*Inactivos:* 1
*Última:* 02:04
*Filtros:* Antilink`
        }
    ];
}

module.exports = { ejemplosPanel };
