
;; billboard v2

;; error consts
(define-constant ERR_INVALID_STRING u0)
(define-constant ERR_STX_TRANSFER   u1)

;; data maps/vars
(define-data-var billboard-message (string-utf8 500) u"Hello World!")
(define-data-var price uint u100)

(define-read-only (get-message)
    (var-get billboard-message)
)

;; public functions
(define-public (set-message (message (string-utf8 500)))
    (begin
        (unwrap! (stx-transfer? (var-get price) tx-sender (as-contract tx-sender)) (err ERR_STX_TRANSFER))
        (if (var-set billboard-message message)
            (ok true)
            (err ERR_INVALID_STRING)
        )
    )
)