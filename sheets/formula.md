=IFERROR(
	ARRAYFORMULA(
		SUM(
			--REGEXREPLACE(
				REGEXEXTRACT(
					FILTER(
						Commandes!J$2:Commandes!J$494;
						Commandes!C$2:Commandes!C$494 >= E$2;
						Commandes!C$2:Commandes!C$494 <= F$2;
						IF(ISBLANK(G$2); Commandes!C$2:Commandes!C$494 <= F$2; Exact(Commandes!D$2:Commandes!D$494;G$2) );
						REGEXMATCH(
							Commandes!J$2:Commandes!J$494;
							CONCAT(A2;":([0-9]*[\.[0-9]+]?);")
						)
					);
					CONCAT(A2;":([0-9]*[\.[0-9]+]?);")
				);
				"\."; ","
			)
		)
	)	
; 0)

=COUNTIFS(
    Commandes!C$2:Commandes!C$494;
    ">="&E$2;
    Commandes!C$2:Commandes!C$494;
    "<="&F$2
)
