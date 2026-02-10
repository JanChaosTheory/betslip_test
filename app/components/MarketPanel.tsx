"use client";

import { Fragment } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { SelectionCell } from "./SelectionCell";
import { MarketGrid } from "./MarketGrid";
import { MarketRowGridHeader, MarketRowGridRow } from "./MarketRowGrid";
import { cn } from "@/lib/utils";
import type { Market } from "../data/match";

export type RowSelection = Record<string, string | null>;

type MarketPanelProps = {
  market: Market;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rowSelections: RowSelection;
  onRowSelect: (rowId: string, optionId: string | null) => void;
  children?: React.ReactNode;
};

/** Numeric row labels (e.g. totals 21.5, 6.5) use right-aligned variant for consistent alignment. */
function isNumericLabel(value: string | undefined): boolean {
  if (value == null || value === "") return false;
  return /^\d+(\.\d+)?$/.test(value);
}

export function MarketPanel({
  market,
  open,
  onOpenChange,
  rowSelections,
  onRowSelect,
  children,
}: MarketPanelProps) {
  const isTable = market.columnHeaders && market.columnHeaders.length > 0;
  const isDoubleResult = market.layout === "doubleResult";
  const isThreeCol =
    isTable &&
    market.columnHeaders!.length === 3 &&
    market.rows[0]?.options.length === 3;

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <div className="theme-transition border-b border-border">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="theme-transition flex w-full items-center justify-between rounded-none px-4 py-3"
          >
            <span className="truncate font-semibold">{market.title}</span>
            <span className="flex items-center gap-2">
              <ChevronDown
                className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
              />
            </span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4">
            {isDoubleResult ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {market.rows.map((row) => (
                  <SelectionCell
                    key={row.id}
                    option={row.options[0]!}
                    selected={rowSelections[row.id] === row.options[0]?.id}
                    onToggle={() => {
                      const current = rowSelections[row.id];
                      const optId = row.options[0]?.id ?? null;
                      onRowSelect(row.id, current === optId ? null : optId);
                    }}
                  />
                ))}
              </div>
            ) : isTable ? (
              <MarketGrid variant={isThreeCol ? "3col" : "2col"}>
                {isThreeCol ? (
                  <>
                    <MarketRowGridHeader
                      columnCount={3}
                      label=""
                      headers={[
                        market.columnHeaders![0],
                        market.columnHeaders![1],
                        market.columnHeaders![2],
                      ]}
                    />
                    {market.rows.map((row) => (
                      <MarketRowGridRow
                        key={row.id}
                        variant="label"
                        labelOrValue={row.rowLabel ?? ""}
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        thirdOption={row.options[2]}
                        rowId={row.id}
                        rowSelections={rowSelections}
                        onRowSelect={onRowSelect}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <MarketRowGridHeader
                      columnCount={2}
                      label={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![0] ?? ""
                          : ""
                      }
                      leftHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![1] ?? ""
                          : market.columnHeaders![0] ?? ""
                      }
                      rightHeader={
                        market.columnHeaders!.length >= 3
                          ? market.columnHeaders![2] ?? ""
                          : market.columnHeaders![1] ?? ""
                      }
                    />
                    {market.rows.map((row) => (
                      <MarketRowGridRow
                        key={row.id}
                        variant={
                          isNumericLabel(row.rowLabel) ? "numeric" : "label"
                        }
                        labelOrValue={row.rowLabel ?? ""}
                        leftOption={row.options[0]!}
                        rightOption={row.options[1]!}
                        rowId={row.id}
                        rowSelections={rowSelections}
                        onRowSelect={onRowSelect}
                      />
                    ))}
                  </>
                )}
              </MarketGrid>
            ) : (
              <MarketGrid variant="2col">
                {market.rows.map((row) => (
                  <Fragment key={row.id}>
                    <MarketRowGridRow
                      variant="label"
                      labelOrValue=""
                      leftOption={row.options[0]!}
                      rightOption={row.options[1]!}
                      rowId={row.id}
                      rowSelections={rowSelections}
                      onRowSelect={onRowSelect}
                    />
                  </Fragment>
                ))}
              </MarketGrid>
            )}
            {children}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
